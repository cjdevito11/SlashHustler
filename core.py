import tkinter as tk
from tkinter import simpledialog
import pyautogui
import time
import json
import os
import pytesseract
from PIL import ImageGrab
import random
import keyboard
import sys
import mouse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import pygetwindow as gw
import threading
from collections import deque

# Redirect print function
class StdoutRedirector:
    def __init__(self, widget):
        self.widget = widget

    def write(self, message):

        self.widget.insert(tk.END, message)
        self.widget.see(tk.END)

    def flush(self):
        pass

# Global variables and configurations
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
running = False
fighting = False
fight_state = 0
role = ''
attack_counter = 0
loot_threshold = 4

CHARACTER_JSON_PATH = 'configs/HustlinPies.json'  # Update this to get character name

CONFIG = {
    "name": "CharacterName",
    "class": "dps",
    "leader": False,
    "whistle": False,
    "lootThreshold": 4,
    "inventory": [],
    "equipment": {
        "weapon": {},
        "armor": {},
        "charms": [],
        "glyphs": []
    }
}

equipped = []
inventory = []

def load_scoring_system():
    with open('jsons/itemScore.json', 'r') as file:
        scoring_system = json.load(file)
        print('Loaded scoring system:', json.dumps(scoring_system, indent=4))  # Print the entire JSON for debugging
        return scoring_system

scoring_system = load_scoring_system()


def reset_maze(driver):
    """
    Resets the maze by going back to town and re-entering the catacombs.
    """
    town_heal(driver)  # Go back to town for healing
    select_catacombs(driver)  # Re-enter the catacombs to reset the maze
    time.sleep(2)

### NAVIGATION ###


def parse_maze(driver):
    """
    Parses the maze structure from the game's HTML.
    """
    maze_grid = {}  # A dictionary to store tile positions and their statuses
    svg_elements = driver.find_elements(By.CSS_SELECTOR, ".mapSVG rect")

    for element in svg_elements:
        x = int(element.get_attribute('x'))
        y = int(element.get_attribute('y'))
        status = element.get_attribute('fill')
        if status == '#22AA22':  # Assuming this color represents 'open' tiles
            maze_grid[(x, y)] = 'open'
        else:
            maze_grid[(x, y)] = 'blocked'

    return maze_grid



def move_in_maze(direction):
    time.sleep(random.uniform(0.5, 1.5))

    if direction == 'up':
        pyautogui.press('w')
    elif direction == 'down':
        pyautogui.press('s')
    elif direction == 'left':
        pyautogui.press('a')
    elif direction == 'right':
        pyautogui.press('d')
        
    time.sleep(random.uniform(0.5, 1.5))

def get_direction(current_tile, next_tile):
    """
    Returns the direction to move from current_tile to next_tile.
    """
    current_x, current_y = current_tile
    next_x, next_y = next_tile

    if next_y < current_y:
        return 'up'
    elif next_y > current_y:
        return 'down'
    elif next_x < current_x:
        return 'left'
    elif next_x > current_x:
        return 'right'


def explore_and_fight(driver, maze_grid, start_position):
    """
    Explore the maze, fight monsters, and click 'engage' to return to the maze after each fight.
    """
    visited = set()
    unexplored = deque([start_position])  # Queue to track unexplored tiles
    print(f"Starting exploration at position: {start_position}")
    
    while unexplored:
        current_tile = unexplored.popleft()  # Get the next tile to explore
        visited.add(current_tile)
        print(f"Exploring tile: {current_tile} | Visited: {len(visited)} | Unexplored: {len(unexplored)}")
        
        # Check neighbors
        neighbors = [
            (current_tile[0], current_tile[1] + 8),  # Move up
            (current_tile[0], current_tile[1] - 8),  # Move down
            (current_tile[0] + 8, current_tile[1]),  # Move right
            (current_tile[0] - 8, current_tile[1])   # Move left
        ]
        
        # Filter out blocked or already visited tiles
        valid_neighbors = [
            neighbor for neighbor in neighbors 
            if neighbor in maze_grid and maze_grid[neighbor] == 'open' and neighbor not in visited
        ]
        
        if valid_neighbors:
            for neighbor in valid_neighbors:
                unexplored.append(neighbor)
                direction = get_direction(current_tile, neighbor)
                print(f"Moving from {current_tile} to {neighbor} in direction: {direction}")
                move_in_maze(direction)
                break  # Move in only one direction per loop iteration

        # If no valid neighbors, the current tile is a dead end
        if not valid_neighbors:
            print(f"Dead end at {current_tile}, backtracking...")

        log_maze_state(maze_grid, visited)

        # If the entire maze is explored, reset and start again
        if len(visited) == len([tile for tile, status in maze_grid.items() if status == 'open']):
            print("Maze fully explored, resetting maze.")
            reset_maze(driver)  # Reset the maze and start again
            return True

def trigger_fight(driver):
    monsters = get_monsters(driver)  # Get the list of monsters on screen
    while monsters:
        fight_based_on_role(driver,role)
        #attack_monster(driver, monster)

        health_mana_data = get_health_mana(driver)
        if health_mana_data['hp'] < 40:
            fight_heal(driver, health_mana_data['hp'], health_mana_data['mp'])

        monsters = get_monsters(driver) 

    if is_engage_button_visible(driver):
        click_engage_button(driver)


def log_maze_state(maze_grid, visited):
    """
    Logs the current state of the maze to show which tiles have been visited.
    """
    grid_size = 40  # Assuming a 40x40 grid for the maze; adjust according to your maze
    maze_representation = ''

    for y in range(0, grid_size * 8, 8):  # Y-axis (step by 8, same as in the maze structure)
        for x in range(0, grid_size * 8, 8):  # X-axis
            tile = (x, y)
            if tile in visited:
                maze_representation += 'V '  # Mark visited tiles
            elif tile in maze_grid:
                maze_representation += '. '  # Mark open but unexplored tiles
            else:
                maze_representation += '# '  # Mark blocked tiles
        maze_representation += '\n'  # Newline for each row
    
    print(f"Current Maze State:\n{maze_representation}")

def get_current_position(driver):
    """
    Function to return the current position in the maze.
    If no previous exploration, assume starting at (0, 0).
    """
    # Assuming we can extract the current position from the game UI or we start at (0, 0)
    return (0, 0)  # Start here unless you have a way to get a more accurate starting position from the UI


def explore_maze_until_monster(driver):
    """
    Explore the maze starting from the known position, updating the maze grid
    and breaking out once a monster is encountered.
    """
    print("Exploring the maze...")
    current_position = get_current_position_from_arrow(driver)
    visited = set()
    #current_position = get_current_position(driver)  # Starting at (0, 0) or known position
    unexplored = deque([current_position])
    maze_grid = {}  # Dictionary to store discovered tiles

    while unexplored:
        current_tile = unexplored.popleft()
        visited.add(current_tile)

        print(f"Exploring tile: {current_tile} | Visited: {len(visited)} | Unexplored: {len(unexplored)}")

        # Now that we've visited the current tile, mark it as visited in the maze
        maze_grid[current_tile] = 'visited'

        # Check for nearby unexplored neighbors
        neighbors = [(current_tile[0] + dx, current_tile[1] + dy)
                     for dx, dy in [(0, 8), (0, -8), (8, 0), (-8, 0)]]

        for neighbor in neighbors:
            if neighbor not in visited:
                unexplored.append(neighbor)
                direction = get_direction(current_tile, neighbor)
                print(f"Moving from {current_tile} to {neighbor} in direction: {direction}")
                
                move_in_maze(direction)  # Move the character to the next tile

                # Check for monsters after each move
                monsters = get_monsters(driver)
                if monsters:
                    print(f"Monsters encountered at {neighbor}, breaking out of maze exploration.")
                    return  # Return control to the main fight script

        # If no new tiles are found and all nearby tiles are explored, stop the exploration

        # You could also add a stopping condition here if you want to reset after full exploration

        # Optionally log the current maze state if you want to track it visually
        log_maze_state(maze_grid, visited)



####

def get_current_position_from_arrow(driver):
    """
    Fetches the player's current position by parsing the arrow's 'd' attribute.
    """
    try:
        # Find the arrow element by selecting the path with stroke="#ccc"
        arrow_element = driver.find_element(By.CSS_SELECTOR, 'path[stroke="#ccc"]')
        
        # Extract the 'd' attribute, which contains the arrow's coordinates
        d_attr = arrow_element.get_attribute("d")
        
        # Example: "M91 163 L91 168.5 96.5 165.75 91 163"
        # We want to extract the starting coordinates: M91 163
        start_coordinates = d_attr.split(" ")[0:2]  # Get the M and the first coordinate pair

        # Convert the coordinates to integers
        x = int(start_coordinates[0][1:])  # Remove 'M' and convert to integer
        y = int(start_coordinates[1])

        return (x, y)  # Return as tuple
    except Exception as e:
        print(f"Error fetching current position: {e}")
        return (0, 0)  # Default fallback if not found

def get_arrow_position(driver):
    """
    Finds the player's current arrow position on the map using its SVG path element.
    """
    try:
        arrow_element = driver.find_element(By.CSS_SELECTOR, 'path[fill="#ccc"]')
        arrow_position = arrow_element.get_attribute('d')  # Path data attribute
        # Extract x, y coordinates from the arrow's path data (e.g., "M91 163 ...")
        coordinates = arrow_position.split(' ')[1:3]
        return int(coordinates[0]), int(coordinates[1])
    except Exception as e:
        print(f"Error fetching arrow position: {e}")
        return None


def explore_maze(driver):
    """
    Explores the maze dynamically starting from the player's current position
    until a monster is encountered or no more walkable tiles remain.
    """
    current_position = get_arrow_position(driver)  # Get the starting position from the arrow
    print(f'* Current Position - {current_position}')
    visited = set()  # Track visited tiles
    unexplored = deque([current_position])  # Queue for tiles to explore

    while unexplored:
        current_tile = unexplored.popleft()  # Get the next tile to explore
        visited.add(current_tile)  # Mark it as visited
        print(f"Exploring tile: {current_tile}")

        # Define possible directions and their corresponding movements
        directions = {
            'up': (0, -8),
            'down': (0, 8),
            'left': (-8, 0),
            'right': (8, 0)
        }

        for direction, (dx, dy) in directions.items():
            next_tile = (current_tile[0] + dx, current_tile[1] + dy)
            
            if next_tile not in visited:
                # Try moving to the new tile
                move_in_maze(direction)

                # After moving, check the new tile's state
                new_position = get_arrow_position(driver)  # Get the new position after moving
                
                # If the move was successful (i.e., the player moved to a new tile)
                if new_position != current_tile:
                    print(f"Moved to new tile: {new_position}")
                    unexplored.append(new_position)

                    # Check if a monster was found
                    if monsters_found(driver):
                        print(f"Monster encountered at {new_position}. Engaging.")
                        #engage_monster(driver)  # Break exploration to fight
                        return  # Exit the maze exploration
                    
                # If the move was unsuccessful (e.g., a wall or blocked path), log and skip
                else:
                    print(f"Could not move to {next_tile} from {current_tile}")

        # If no unexplored tiles remain, reset the maze
        if not unexplored:
            print("Maze fully explored. Resetting the maze.")
            reset_maze(driver)
            return






### NAVIGATION





 ### COOKING ###

def check_flame(driver):
    try:
        print('check_flame')
        # Check if the Flame element is present
        flame_element = driver.find_element(By.CLASS_NAME, "damageText")
        print('Found Flame')
        return True
    except:
        return False

def check_temperature(driver):
    try:
        print('check_temperature')
        # Get the width of the Temperature meter
        temperature_element = driver.find_element(By.CSS_SELECTOR, ".meterBox .meterBoxProg")
        temperature_width = int(temperature_element.get_attribute("style").split('width: ')[1].split('%')[0])
        print(f'temperature_width: {temperature_width}')
        return temperature_width
    except:
        return 100  # Assume full temperature if there's an issue

def click_flame_counter(driver):
    try:
        print('click_flame')
        # Find and click the Flame Counter button
        flame_button = driver.find_element(By.XPATH, "//a[text()='Flame Counter']")
        flame_button.click()
        time.sleep(.5)
    except:
        pass

def check_magical_sardine_fish(driver):
    try:
        print('check_magical_sardine_fish')
        # Get the width of the Magical Sardine Fish meter
        magical_sardine_fish_element = driver.find_element(By.CSS_SELECTOR, ".meterBox .meterBoxProg")
        magical_sardine_fish_width = int(magical_sardine_fish_element.get_attribute("style").split('width: ')[1].split('%')[0])
        print(f'magical_sardine_fish_width: {magical_sardine_fish_width}')
        return magical_sardine_fish_width
    except:
        return 100  # Assume full magical sardine fish if there's an issue

def click_cook(driver):
    try:
        print('click_cook')
        # Find and click the Cook button
        cook_button = driver.find_element(By.XPATH, "//a[text()='Cook']")
        cook_button.click()
        time.sleep(.3)
    except:
        pass

def click_cook_more(driver):
    try:
        print('click_cook_more')
        # Find and click the Cook More button
        cook_more_button = driver.find_element(By.XPATH, "//a[text()='Cook More']")
        if cook_more_button: 
            cook_more_button.click()
            print('Cooked More')
            time.sleep(.3)
            return True
    except:
        pass

def cooking_loop(driver,fishCount):
    try:
        print(' - Cooking Loop - ')
        counter=0

        while counter<fishCount:
            time.sleep(.5)
            # Check if a flame occurred and click Flame Counter if necessary
            if check_flame(driver):
                print("Flame detected, clicking Flame Counter")
                click_flame_counter(driver)

                # Wait for the temperature or magical sardine fish to change before continuing to cook
                #magical_sardine_fish = check_magical_sardine_fish(driver)
                #while magical_sardine_fish == 100:  # Wait until magical sardine fish changes
                #    print('Waiting for magical sardine fish to change...')
                #    time.sleep(0.5)
                #    magical_sardine_fish = check_magical_sardine_fish(driver)
                
                #print('Magical sardine fish changed, switching back to Cook')
            
            # Check Temperature and ensure it's not going to break
            #temperature = check_temperature(driver)
            #if temperature < 10:  # If temperature is below 10%, stop cooking
            #    print(f"Temperature low! - {temperature} - Stopping cook...")
            #    continue  # Skip the cook click to avoid burning the dish
            
            # Click Cook button to cook the dish
            print(' - Cooking Loop - click_cook')
            click_cook(driver)
            

            # Check if the dish has failed and needs more cooking
            try:
                #escape_text = driver.find_element(By.XPATH, "//div[contains(text(), 'Dish Failed')]")
                print("Trying to Cook More...")
                if click_cook_more(driver):
                    counter+=1

            except:
                pass  # Ignore if the dish hasn't failed

            # Small delay to avoid spamming
            time.sleep(0.3)
        fishCount=dragToCook(driver)
        click_cook(driver)
        cooking_loop(driver,fishCount)

    except Exception as e:
        print(f'Failed cooking_loop : {e}')

def dragToCook(driver):
    try:
        print('dragToCook')
        # Find all item slots in the inventory
        inventory_slots = driver.find_elements(By.CSS_SELECTOR, ".invItemsBox .itemSlotBox")

        # Check if any inventory slots are found
        if not inventory_slots:
            print("No inventory slots found.")
            return

        # Iterate through inventory slots to find fish
        for slot in inventory_slots:
            try:
                # Locate the fish image in the itemBox
                fish_element = slot.find_element(By.CSS_SELECTOR, ".itemBox img[src='svg/iconFish.svg']")
                
                # Get the quantity of fish
                fish_quantity_element = slot.find_element(By.CSS_SELECTOR, ".iQnt")
                fish_quantity = fish_quantity_element.text
                fishInt=int(fish_quantity)
                print(f'Found fish with quantity: {fish_quantity}')
                print(f'FishInt: {fishInt}')
                
                # Locate the item box in the cooking popup where the fish needs to be dropped
                popup_item_box = driver.find_element(By.CSS_SELECTOR, ".popupBox.pbSkillup .itemSlotBox")

                # Log popup item box location (for debugging purposes)
                print(f'Popup item box location: {popup_item_box.location}')

                # Use ActionChains to perform the drag-and-drop
                actions = ActionChains(driver)
                actions.drag_and_drop(slot, popup_item_box).perform()
                print(f'Moved fish to cooking popup item box')
                
                # Break the loop after moving the first fish to the popup item box
                return int(fish_quantity)
            except Exception as e:
                print(f"Error finding fish or performing drag-and-drop: {e}")
                continue  # Move to the next slot if no fish is found or error occurs
    except Exception as e:
        print(f'Failed to move fish to cooking popup item box: {e}')



def startCooking(driver):
    try:
        if is_in_town(driver):
            selectCooking(driver)
        
        # Move fish from inventory to the oven before starting cooking and get quanty
        fishCount=dragToCook(driver)

        # Start cooking after placing the fish in the oven
        click_cook(driver)
        cooking_loop(driver,fishCount)
        print('Done Cooking')
    except Exception as e:
        print(f'Failed to start cooking: {e}')

    
def check_snag(driver):
    try:
        print('check_snag')
        # Check if the Snag element is present
        snag_element = driver.find_element(By.CLASS_NAME, "damageText")
        print('Found Snag')
        return True
    except:
        return False

def check_rod_health(driver):
    try:
        print('check_rod_health')
        # Get the width of the Rod Health meter
        rod_health_element = driver.find_element(By.CSS_SELECTOR, ".meterBox .meterBoxProg")
        rod_health_width = int(rod_health_element.get_attribute("style").split('width: ')[1].split('%')[0])
        print(f'rod_health_width: {rod_health_width}')
        return rod_health_width
    except:
        return 100  # Assume full health if there's an issue

def click_snag_counter(driver):
    try:
        print('click_snag')
        # Find and click the Snag Counter button
        snag_button = driver.find_element(By.XPATH, "//a[text()='Snag Counter']")
        snag_button.click()
        time.sleep(.2)
        snag_button.click()
    except:
        pass

def check_reel_progress(driver):
    try:
        print('check_reel_progress')
        # Get the width of the Reel Progress meter
        reel_progress_element = driver.find_element(By.CSS_SELECTOR, ".meterBox .meterBoxProg")
        reel_progress_width = int(reel_progress_element.get_attribute("style").split('width: ')[1].split('%')[0])
        print(f'reel_progress_width: {reel_progress_width}')
        return reel_progress_width
    except:
        return 100  # Assume full reel progress if there's an issue

def click_reel(driver):
    try:
        print('click_reel')
        # Find and click the Reel button
        reel_button = driver.find_element(By.XPATH, "//a[text()='Reel']")
        reel_button.click()
        time.sleep(.3)
    except:
        pass

def click_recast(driver):
    try:
        print('click_recast')
        # Find and click the Recast Line button
        recast_button = driver.find_element(By.XPATH, "//a[text()='Recast Line']")
        recast_button.click()
        print('Recasted')
        time.sleep(.3)
    except:
        pass

def click_fish(driver):
    try:
        print('click_fish')
        fishButton = driver.find_element(By.LINK_TEXT, "Fish")
        fishButton.click()
        time.sleep(.3)
    except:
        print('failed to click fish button')

def fishing_loop(driver, townHeal=False):
    try:
        print(' - Fishing Loop - ')
        while True:
            x=0
            while x <= 10:
                time.sleep(.3)
                # Check if a snag occurred and click Snag Counter if necessary
                if check_snag(driver):
                    print("Snag detected, clicking Snag Counter")
                    click_snag_counter(driver)
                print(' - Fishing Loop - click_reel')
                click_reel(driver)
                x += 1

            #reel_progress = check_reel_progress(driver)
            #while reel_progress == 100:  # Wait until reel progress changes
            #    print('Waiting for reel progress to change...')
            #    time.sleep(0.5)
            #    reel_progress = check_reel_progress(driver)
                
            #print('Reel progress changed, switching back to Reel')
            
            #rod_health = check_rod_health(driver)
            #if rod_health < 10:  # If rod health is below 10%, stop reeling
            #    print(f"Rod health low! - {rod_health} - Stopping reel...")
            #    continue  
            
            try:
                #escape_text = driver.find_element(By.XPATH, "//div[contains(text(), 'Escaped the Hook')]")
                print("Trying to Recast line...")
                click_recast(driver)
                if townHeal & isHealthBelow(driver,90) == False:
                    return
            except:
                pass  # Ignore if the fish hasn't escaped

            # Small delay to avoid spamming
            time.sleep(0.3)
    except Exception as e:
        print(f'Failed fishing_loop : {e}')


def startFishing(driver, townHeal = False):
    try:
        time.sleep(1)
        if is_in_town(driver):
            selectFishingPond(driver)
        click_fish(driver)
        fishing_loop(driver, townHeal)
        print('Done Fishing')
        time.sleep(1)
        fishingToTown(driver)
    except:
        print('Failed to click Fish to town button')


# Function to update overlay position
def update_overlay_position():
    global fighting
    while fighting != True:
        try:
            # Get the Chrome window
            chrome_window = gw.getWindowsWithTitle("Ladder Slasher v1.33.1")[0]
            if chrome_window:
                # Check if Chrome is minimized
                if chrome_window.isMinimized:
                    print('Chrome Window Minimized')
                    #overlay.withdraw()  # Hide the overlay
                    overlay.attributes('-topmost', False)
                else:
                    # Position overlay on top of Chrome
                    print('Chrome Window NOT Minimized')
                    chrome_pos = chrome_window.topleft
                    newX = chrome_pos.x + 1000 
                    newY = chrome_pos.y + 730
                    overlay.geometry(f"500x400+{newX}+{newY}")
                    overlay.deiconify()  # Show the overlay if hidden
                    #overlay.attributes('-topmost', True)
            time.sleep(1)  # Check every second
        except IndexError:
            pass  # Handle case where window might not be found
    if fighting == True:
        print('fighting = true')
        try:
            # Get the Chrome window
            chrome_window = gw.getWindowsWithTitle("Ladder Slasher v1.33.1")[0]
            if chrome_window:
                # Check if Chrome is minimized
                if chrome_window.isMinimized:
                    print('Chrome Window Minimized')
                    #overlay.withdraw()  # Hide the overlay
                    overlay.attributes('-topmost', False)
                else:
                    # Position overlay on top of Chrome
                    print('Chrome Window NOT Minimized')
                    chrome_pos = chrome_window.topleft
                    newX = chrome_pos.x + 1000
                    newY = chrome_pos.y + 730
                    overlay.geometry(f"500x400+{newX}+{newY}")
                    overlay.deiconify()  # Show the overlay if hidden
                    #overlay.attributes('-topmost', True)
            time.sleep(1)  # Check every second
        except IndexError:
            pass  # Handle case where window might not be found
            
# Selenium setup
def setup_browser():
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "localhost:9222")
    driver = webdriver.Chrome(options=chrome_options, service=Service(r"C:\Windows\System32\chromedriver.exe"))
    return driver

def write_to_terminal(message):
    terminal_output.insert(tk.END, message + '\n')
    terminal_output.see(tk.END)

def getCharacter(driver):
    global CHARACTER_JSON_PATH, CONFIG, loot_threshold
    characterName = driver.find_element(By.CSS_SELECTOR, ".cName").text
    print(f'characterName: {characterName}')
    charJsonPath = 'configs/' + characterName
    charJsonPath = charJsonPath + '.json'
    print(f'charJsonPath: {charJsonPath}')
    CHARACTER_JSON_PATH = charJsonPath
    CONFIG = loadConfig()
    loot_threshold = CONFIG["loot_threshold"]
    return

# Load character data from JSON
def loadConfig():
    if os.path.exists(CHARACTER_JSON_PATH):
        with open(CHARACTER_JSON_PATH, 'r') as file:
            return json.load(file)
    else:
        return CONFIG

def saveConfig():
    global CONFIG, CHARACTER_JSON_PATH
    try:
        with open(CHARACTER_JSON_PATH, 'w') as file:
            json.dump(CONFIG, file, indent=4)
        print(f"Successfully saved CONFIG to {CHARACTER_JSON_PATH}")
    except Exception as e:
        print(f"Error saving CONFIG to {CHARACTER_JSON_PATH}: {e}")

def update_character_json(driver):
    global CONFIG, equipped, inventory
    try:
        print("Updating character JSON...")

        print('Scan Equipment Next')
        equipped = scanEquippedItems(driver)
        print('Scan Inventory Next')
        inventory = scanInventoryItems(driver)

        CONFIG["inventory"] = inventory
        CONFIG["equipment"] = equipped

        print(f"New Inventory: {CONFIG['inventory']}")
        print(f"New Equipment: {CONFIG['equipment']}")

        saveConfig()
        print(f"Character JSON updated and saved.")
    except Exception as e:
        print(f"Error updating character JSON: {e}")


def move_to_position(driver, move_class):
    try:
        button = driver.find_element(By.CLASS_NAME, move_class)
        button.click()
        time.sleep(1)  # Allow some time for movement to process
    except Exception as e:
        write_to_terminal(f"Error moving to position: {e}")

def ensure_position(driver, expected_position):
    try:
        position_element = driver.find_element(By.CLASS_NAME, 'charImg')
        current_position = position_element.get_attribute('class')
        if expected_position not in current_position:
            if 'posBack' in expected_position:
                move_to_position(driver, 'moveL')
            elif 'posFront' in expected_position:
                move_to_position(driver, 'moveR')
    except Exception as e:
        write_to_terminal(f"Error ensuring position: {e}")


#####################################

def hoverOnItem(driver,item):
    try:
        actions = ActionChains(driver)
        actions.move_to_element(item).perform()
        time.sleep(.05)
    except Exception as e:
        print (f'Error hovering over {item}: {e}')

def extractHtmlFromPopup(driver):
    try:
        popup = driver.find_element(By.CSS_SELECTOR, ".tipBox.tbItemDesc")
        itemHtml = popup.get_attribute('outerHTML')
        return itemHtml
    except Exception as e:
        print(f'Error extracting data from Drop')
        return None

def parseNotEquippedItem(html):
    item_box = BeautifulSoup(html, 'html.parser')
    item_details = {}

    try:
    # Ensure to ignore the equipped section if present
        equipped_section = item_box.find('div', class_='iEquipped')
        if equipped_section:
            equipped_section.extract()  # Remove equipped item section from the HTML
    except:
        print('Except (equipped section in parseNotEquippedItem)')

    # Parse the non-equipped item details (from the remaining part of the tooltip)
    item_name = item_box.find('div', class_='fcb fwb').text.strip()
    item_details['name'] = item_name


     # Extract magic and quality level
    try:
        iMag = item_box.find_element(By.CSS_SELECTOR, ".iMag").text.strip()
        item_details['magic_level'] = iMag
    except:
        item_details['magic_level'] = None

    try:
        iQual = item_box.find_element(By.CSS_SELECTOR, ".iQual").text.strip()
        item_details['quality_level'] = iQual
    except:
        item_details['quality_level'] = None


    # Find all stats inside this specific itemdescBox
    stats = item_box.find_all('div', class_='fcb')

    for stat in stats:
        try:
            text = stat.text.strip()
            if 'Level Req' in text:
                item_details['level_req'] = text.split(': ')[1]
            elif 'Damage' in text:
                item_details['damage'] = text.split(': ')[1]
            elif 'Defense' in text:
                defense_type = 'physical_defense' if 'Physical' in text else 'magical_defense'
                item_details[defense_type] = text.split(': ')[1]
            elif 'Mana Cost' in text:
                item_details['mana_cost'] = text.split(': ')[1]
            elif 'Heals' in text:
                item_details['heals'] = text.split(': ')[1]
            elif '%' in text:
                item_details[text.split('% ')[1]] = text.split('% ')[0]
            elif ' to ' in text:
                wrongName = text.split(' to ')[1]
                newName = wrongName.split(' ')[1]
                leftStat = text.split(' to ')[0]
                rightStat = wrongName.split(' ')[0]
                newStat = leftStat + ' to ' + rightStat
                item_details[newName] = newStat
            else:
                print(f"Unknown stat format, skipping: {text}")
        except Exception as e:
            print(f"Error parsing stat '{text}': {e}")

    print(f"Final parsed item details: {item_details}")
    return item_details

def parseEquippedItem(html):
    soup = BeautifulSoup(html, 'html.parser')
    item_details = {}

    # Handle equipped item
    equipped_item = soup.find('div', class_='iEquipped')

    if equipped_item:
        print("Parsing equipped item details.")
        item_name_div = equipped_item.find('div', class_='fcb fwb')
        item_details['name'] = item_name_div.text.strip() if item_name_div else "Unnamed Item"

         # Extract magic and quality level
        try:
            iMag = equipped_item.find_element(By.CSS_SELECTOR, ".iMag").text.strip()
            item_details['magic_level'] = iMag
        except:
            item_details['magic_level'] = None

        try:
            iQual = equipped_item.find_element(By.CSS_SELECTOR, ".iQual").text.strip()
            item_details['quality_level'] = iQual
        except:
            item_details['quality_level'] = None

        # Extract stats
        stat_divs = equipped_item.find_all('div', class_='fcb')

        # Parse stats
        for stat_div in stat_divs:
            text = stat_div.text.strip()
            try:
                if 'Level Req' in text:
                    item_details['level_req'] = text.split(': ')[1]
                elif 'Damage' in text:
                    item_details['damage'] = text.split(': ')[1]
                elif 'Defense' in text:
                    defense_type = 'physical_defense' if 'Physical' in text else 'magical_defense'
                    item_details[defense_type] = text.split(': ')[1]
                elif '%' in text:
                    value, key = text.split('% ')
                    item_details[key.strip().lower()] = value.strip().replace('+', '')
                elif ' to ' in text:
                    parts = text.split(' to ')
                    if len(parts) == 2:
                        left_part = parts[0].strip()
                        right_part = parts[1].split(' ')[0].strip()
                        stat_name = parts[1].split(' ')[1].strip()
                        item_details[stat_name.lower()] = f"{left_part} to {right_part}"
                else:
                    print(f"Unknown stat format, skipping: {text}")
            except Exception as e:
                print(f"Error parsing stat '{text}': {e}")

    print(f"Final parsed equipped item details: {item_details}")
    return item_details

def hoverExtractParse(driver, item, is_equipped=False):
    try:
        hoverOnItem(driver,item)
        item_html = extractHtmlFromPopup(driver)
        
        if is_equipped:
            parsed_item = parseEquippedItem(item_html)
        else:
            parsed_item = parseNotEquippedItem(item_html)

        return parsed_item if 'name' in parsed_item else {}

    except Exception as e:
        print(f"Error in hoverExtractParse {e}")
        return {}


###################################################

def scanEquippedItems(driver):
    equipped = {}
    equipped_slots = driver.find_elements(By.CSS_SELECTOR, ".invEquipped .invEqWrap") 

    for slot in equipped_slots:
        time.sleep(0.3)
        slot_label = slot.find_element(By.CSS_SELECTOR, ".invEqLabel").text.strip().lower().replace(' ', '_')  # Use the slot label as the key
        try:
            item_element = slot.find_element(By.CSS_SELECTOR, ".itemBox")
            img_element = item_element.find_element(By.CSS_SELECTOR, "img")
            item_type = img_element.get_attribute('src').split('/')[-1].replace('.svg', '')
            
            item_details = {}
            item_details['type'] = item_type

            parsedItem = hoverExtractParse(driver, item_element, True)
            if parsedItem:
                item_details.update(parsedItem)

            # Ensure the item has a name
            if 'name' not in item_details:
                print(f"Equipped item in slot '{slot_label}' does not have a name, skipping...")
                continue

            # Calculate item score
            item_score = calculate_item_score(item_details['name'], item_details)
            item_details['score'] = item_score
            item_details['action'] = 'fight_with'  # Equipped items are used for fighting

            # Add item to the equipment dictionary using slot_label as key instead of WebElement
            equipped[slot_label] = item_details
            print('Appended Equipped')

        except Exception as e:
            print(f"Error processing slot '{slot_label}': {e}")
            equipped[slot_label] = None
    return equipped


def scanInventoryItems(driver):
    inventory = {}
    invItemNumber = 0
    print('Scan Inventory')
    inventory_items = driver.find_elements(By.CSS_SELECTOR, ".invEqBox .itemSlotBox .itemBox")
            # Define thresholds and actions
    fight_threshold = 10
    keep_threshold = 5
    shrine_threshold = 2

    print(f'inventory_items: {inventory_items}')

    for item in inventory_items:
        invItemNumber += 1
        time.sleep(0.3)
        item_details = {}
        #img_element = item.find_element(By.CSS_SELECTOR, "img")
        #item_type = img_element.get_attribute('src').split('/')[-1].replace('.svg', '')

        # Hover to get detailed stats
        detailed_item = hoverExtractParse(driver, item, False)
        if detailed_item:
            item_details.update(detailed_item)

        # Ensure the item has a name
        if 'name' not in item_details:
            print("Item does not have a name, skipping...")
            continue

        # Calculate item score
        item_score = calculate_item_score(item_details['name'], item_details)
        print(f'ITEM SCORE : {item_score}')


        if item_score >= fight_threshold:
            action = 'fight_with'
        elif item_score >= keep_threshold:
            action = 'keep'
        elif item_score >= shrine_threshold:
            action = 'shrine'
        else:
            action = 'sell'

        item_details['score'] = item_score
        item_details['action'] = action

        inventory[invItemNumber] = item_details
        time.sleep(0.3)
        print('Appended Inventory')
    return inventory


def scanDroppedItems(driver, drop_items):
    global loot_threshold

    print('--- Score Drops ---')

    # Log file name
    log_filename = "logs/itemDrops.txt"
    
    for item in drop_items:
        time.sleep(.3)
        parsedItem = hoverExtractParse(driver,item,False)
        
        if parsedItem:
            print(f'parsed_item = {parsedItem}')
            item_score = calculate_item_score(parsedItem['name'], parsedItem)

            print('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
            print(f"Item: {parsedItem['name']}, Score: {item_score}")
            print('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
                 # Log the item to file
            log_item_to_file(parsedItem, item_score, log_filename)


            print(f'Check if item_score > loot_threshold -------------- {item_score} > {loot_threshold}')
                # Decide if the item should be looted
            if item_score > loot_threshold:
                print('TRY TO LOOT ITEM: {item}')
                loot_item(driver, item)


def hover_and_extract_item(driver, item, is_equipped=False):
    try:
        hoverOnItem(driver,item)
        item_html = extractHtmlFromPopup(driver)
        
        if is_equipped:
            parsed_item = parseEquippedItem(item_html)
        else:
            parsed_item = parseNotEquippedItem(item_html)

        return parsed_item if 'name' in parsed_item else {}

    except Exception as e:
        print(f"Error in hover_and_extract_item {e}")
        return {}


def calculate_item_score(item_name, item_details):
    print(f'~~~~~~~~~~~~~~~~~~~ Calculating Item Score ~~~~~~~~~~~~~~~~~')
    print(f'~~~~~~~~~~~~~~~~~~ Item Name : {item_name} ~~~~~~~~~~~~~~~~')
    print(f'~~~~~~~~~~~~~~~~~~ Item Details : {item_details} ~~~~~~~~~~~~~~~~')
    print(f'------------------')

    score = 0
    
    # Normalize item name for debugging purposes
    normalized_item_name = item_name.replace('_', ' ').replace('-', ' ').lower()
    print(f'Normalized Item Name: {normalized_item_name}')
    
    # Iterate through the item details to find matching modifiers
    for stat, value in item_details.items():
        # Normalize stat names for lookup in both item details and scoring system
        normalized_stat = stat.replace('_', ' ').replace('-', ' ').replace('%', '').strip().lower()

        print(f'Checking stat: {normalized_stat} with value: {value}')
        
        # Check if the stat exists in the scoring system (in any of its formats)
        if normalized_stat in scoring_system:
            try:
                # Handle numerical values with ranges or percentages
                if 'to' in value:
                    stat_value = int(value.split(' to ')[1])  # Use the maximum of the range
                else:
                    stat_value = int(value.strip('+%'))
                
                print(f'Stat value extracted: {stat_value}')
            except Exception as e:
                stat_value = 1  # Default to 1 if parsing fails
                print(f'Error parsing stat value for {normalized_stat}, defaulting to 1. Error: {e}')

            # Apply score modifier based on the extracted value from JSON
            stat_score = scoring_system[normalized_stat].get(str(stat_value), 0)
            print(f'Modifier for {normalized_stat} with value {stat_value}: {stat_score}')
            score += stat_score
        else:
            # Print out the keys available in the scoring system for debugging
            print(f"Stat '{normalized_stat}' not found in scoring system. ")
            #Available stats: {list(scoring_system.keys())}")
    
    print(f'Final calculated score for {item_name}: {score}')
    return score

def log_item_to_file(item_details, item_score, filename="logs/itemDrops.txt"):
    with open(filename, 'a') as log_file:
        log_file.write("+++++++++++++++++++++++++++++++++++++++++++++++++++++\n")
        log_file.write(f"Item Name: {item_details['name']}\n")
        log_file.write(f"Item Details: {item_details}\n")
        log_file.write(f"Item Score: {item_score}\n")
        log_file.write("----- Stats -----\n")
        # Log other item details (such as stats)
        for stat, value in item_details.items():
            if stat != 'name':
                log_file.write(f"{stat.replace('_', ' ').capitalize()}: {value}\n")

        log_file.write("+++++++++++++++++++++++++++++++++++++++++++++++++++++\n\n")

def add_item_to_inventory(driver, item):
    #CONFIG["inventory"].append(parse_item_details(item.get_attribute('outerHTML')))
    #saveConfig()
    pass

# Function to remove an item from the inventory
def remove_item_from_inventory(item_id):
    CONFIG["inventory"] = [item for item in CONFIG["inventory"] if item["id"] != item_id]
    saveConfig()

def isHealthBelow(driver,testhp):
    try:
        health_mana_data = get_health_mana(driver)
        if health_mana_data:
            hp = health_mana_data['hp']
            print(' * - - isHealthBelow {testhp}? ')
            if hp >= testhp:
                print('- No. HP = {hp}')
                return False
            else:
                print('- Yes. HP = {hp}')
                return True
    except:
        pass

# Function to get player's health and mana
def get_health_mana(driver):
    try:
        wait = WebDriverWait(driver, 5)
        health_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".lifeMeter .meterBoxLabel")))
        mana_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".manaMeter .meterBoxLabel")))
        health_text = health_element.text.split(" / ")
        mana_text = mana_element.text.split(" / ")
        current_health = int(health_text[0])
        max_health = int(health_text[1])
        current_mana = int(mana_text[0])
        max_mana = int(mana_text[1])
        hp = (current_health / max_health) * 100
        mp = (current_mana / max_mana) * 100
        return {
            "hp": hp,
            "mp": mp
        }
    except Exception as e:
        write_to_terminal(f"Error: {e}")
        return None

def monsters_found(driver):
    try:
        monsters = driver.find_elements(By.CSS_SELECTOR, ".mobArea .mob")
        print(f'{len(monsters)} monsters found.')
        return len(monsters) > 0
    except Exception as e:
        print(f"Error checking for monsters: {e}")
        return False

# Function to find all monsters and their health
def get_monsters(driver):
    try:
        monsters = driver.find_elements(By.CSS_SELECTOR, ".mobArea .mob")
        monster_list = []
        
        for monster in monsters:
            name_element = monster.find_element(By.CSS_SELECTOR, ".meterBoxLabel")
            health_bar = monster.find_element(By.CSS_SELECTOR, ".lifeMeter .meterBoxProg")
            health_percentage = float(health_bar.get_attribute("style").split("width: ")[1].split("%")[0])
            monster_name = name_element.text

            write_to_terminal(f"Monster: {monster_name}, Health: {health_percentage}%")
            print(f"Monster: {monster_name}, Health: {health_percentage}%")
            monster_list.append({
                "element": monster,
                "name": monster_name,
                "health_percentage": health_percentage
            })

        return monster_list
    except Exception as e:
        write_to_terminal(f"Error: {e}")
        return []

# Function to switch to attack slot if health is above 70%
def attack_switch(driver, hp, mp):
    if hp > 60 or mp < 30:
        try:
            attack_slot = driver.find_element(By.CSS_SELECTOR, ".tbIcon.atkBox[slot='0']")
            if "sel" not in attack_slot.get_attribute("class"):
                attack_slot.click()
                write_to_terminal("Switched to attack slot.")
                print("Switched to attack slot.")
        except Exception as e:
            write_to_terminal(f"Error switching to attack slot: {e}")

# Function to attack a monster
def attack_monster(driver, monster):
    try:
        write_to_terminal(f"Attacking monster: {monster['name']}")
        actions = ActionChains(driver)
        actions.move_to_element(monster["element"]).click().perform()
    except Exception as e:
        write_to_terminal(f"Error attacking monster: {e}")

# Function to send keystrokes
def send_keystrokes(driver, keys):
    try:
        # Find an element to send keystrokes to (e.g., the body or a specific element)
        body = driver.find_element(By.TAG_NAME, "body")
        actions = ActionChains(driver)
        actions.move_to_element(body)
        
        # Send the specified keys
        actions.send_keys(keys).perform()
        
        write_to_terminal(f"Sent keystrokes: {keys}")
    except Exception as e:
        write_to_terminal(f"Error sending keystrokes: {e}")

# Function to go to town for healing
def town_heal(driver):
    try:
        try:
            town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")
            town_button.click()
        finally:
            print(" - Talking to Akara - ")
            write_to_terminal("Talking to Akara")
            time.sleep(5)  # Adjust healing time as needed
            #startFishing(driver, True)
            health_mana_data = get_health_mana(driver)
            if health_mana_data:
                hp = health_mana_data['hp']
                mp = health_mana_data['mp']
                
                write_to_terminal(f"~Town Stats~")
                write_to_terminal(f"-HP: {hp}")
                write_to_terminal(f"-MP: {mp}")

                if hp < 90:
                    print("~~ Loop TownHeal ~~")
                    town_heal(driver)
                    return
                    
        
    except Exception as e:
        write_to_terminal(f"Error going to town: {e}")

def fight_heal(driver,hp,mp):
    if hp < 50:
        if mp > 20: 
            send_keystrokes(driver,"R")
            time.sleep(1)
            #fight_heal(driver,hp,mp)
            send_keystrokes(driver,"Q")
            actions = ActionChains(driver).key_down(Keys.CONTROL).key_up(Keys.CONTROL).perform()
        else:
            send_keystrokes(driver,"Q")
            return
    else:
        send_keystrokes(driver,"Q")
        return

# Function to check if in town
def is_in_town(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                return True
        return False
    except Exception:
        return False

# Function to check if engage button is visible
def is_engage_button_visible(driver):
    try:
        print('Is Engage Button Visible?')
        engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
        display_style = engage_button.get_attribute("style")
        if "display: block" in display_style:
            print('TRUE')
            return True
        print('FALSE')
        return False
    except Exception:
        print('CANT FIND ENGAGE BUTTON')
        return False

# Function to select catacombs when in town
def select_catacombs(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                send_keystrokes(driver, "a")
                send_keystrokes(driver, "a")
                return
    except Exception as e:
        write_to_terminal(f"Error selecting catacombs: {e}")

# Function to select catacombs when in town

def selectCooking(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Cooking" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                return
    except Exception as e:
        write_to_terminal(f"Error selecting fishing pond: {e}")


def selectFishingPond(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Fishing Pond" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                return
    except Exception as e:
        write_to_terminal(f"Error selecting fishing pond: {e}")

def fishingToTown(driver):
    try:
        fishToTownButton = driver.find_element(By.CSS_SELECTOR, ".abutGradBl .fishBTT")
        if fishToTownButton:
            fishToTownButton.click()
        time.sleep(2)
        return
    except Exception as e:
        write_to_terminal(f"Error rowing boat to town: {e}")


# Function to loot an item
def loot_item(driver, item):
    try:
        print(f"Looting item: {item}")
        item.click()
        time.sleep(.2)
        update_character_json(driver)
    except Exception as e:
        print(f"Error looting item: {e}")
        
#Too many monsters, reset dungeon
def resetDungeon(driver):
    try:
        print('-- TOO MANY MONSTERS -- resetDungeon() --')
        town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")  
        town_button.click()
        time.sleep(2)
        controlButtons = driver.find_elements(By.CSS_SELECTOR, ".ctrlButtons .cp") 
        #print(f'controlButtons: {controlButtons}')
        for button in controlButtons:
            buttonName = button.get_attribute("src").split("/")[-1].replace(".svg", "")
            #print(f'buttonName: {buttonName}')
            if buttonName == 'iconGroup':
                button.click()
                time.sleep(2)
                groupTabs = driver.find_elements(By.CSS_SELECTOR, ".njRB") 
                #print(f'groupTabs: {groupTabs}')
                for tab in groupTabs:
                    print(f'tab: {tab}')
                    if tab.text == 'Create Group':
                        print('Create Group')
                        time.sleep(2)
                        tab.click()
                        time.sleep(2)
                        createGroupBtn = driver.find_element(By.CSS_SELECTOR, ".gpControls .gpJoin")  
                        createGroupBtn.click()
                        time.sleep(5)
                        button.click()
                        time.sleep(2)
                        
                        #click edit group tab
                        newGroupTabs = driver.find_elements(By.CSS_SELECTOR, ".njRB")
                        for newTab in newGroupTabs:
                            if newTab.text == 'Edit Group':
                                time.sleep(2)
                                newTab.click()
                                time.sleep(2)
                                ## LEAVE GROUP // EDIT GROUP BUTTONS
                                groupBtns = driver.find_elements(By.CSS_SELECTOR, ".gpControls .gpJoin")  
                                for btn in groupBtns:
                                    if btn.text == 'Leave Group':
                                        time.sleep(2)
                                        btn.click()
                                        time.sleep(30)
                        
        #Create Group
        #Leave Group
        
    finally:
        return
    

def is_leader(driver):
    return bool(driver.find_elements(By.CSS_SELECTOR, ".cName.gLeader"))

def click_engage_button(driver):
    """
    Clicks the 'engage' button to return to the maze after fighting.
    """
    try:
        engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
        engage_button.click()
        time.sleep(1)  # Allow time to return to the maze
    except Exception as e:
        print(f"Error clicking engage button: {e}")


def engage_if_leader(driver):
    if is_leader(driver):
        print('Try find engage as leader')
        if is_engage_button_visible(driver):
            engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")  # Update selector as needed
            if engage_button:
                engage_button.click()
                time.sleep(.5)

                ## NAVIGATE

        # if whistle_var.get():
                # send_keystrokes(driver, "T")  # Assume T is the hotkey for whistle
                # write_to_terminal("Whistled.")
            # if engage_button:
                # engage_button.click()
                # write_to_terminal("Clicked engage button.")
            
            
            
        # SETUP SWITCH FOR WHISTLE

def wait_for_monsters():
    # Function that waits until monsters appear on the screen
    pass  # Implement based on game logic


def fight_based_on_role(driver, role):
    print(f'Fight Based On Role - Role: {role}')
    if role == 'healer':
        ensure_position(driver, 'posBack')
        heal_group_members(driver)
    elif role == 'tank':
        ensure_position(driver, 'posFront')
        attack_nearest_monster(driver)
    elif role == 'mage':
        ensure_position(driver, 'posBack')
        mage_attack_strategy(driver)
    elif role == 'dps':
        ensure_position(driver, 'posBack')
        attack_nearest_monster(driver)
    elif role == 'tankheal':
        ensure_position(driver, 'posFront')
        heal_group_members(driver)
    elif role == 'nohit':
        ensure_position(driver, 'posFront')

def heal_group_members(driver):
    # Example of healing group members
    group_members = driver.find_elements(By.CSS_SELECTOR, ".charObj")
    for member in group_members:
        health_text = member.find_element(By.CSS_SELECTOR, ".lifeMeter .meterBoxLabel").text
        current_health, max_health = map(int, health_text.split(' / '))
        if (current_health / max_health) * 100 < 50:
            # Assuming you have a healing skill assigned to 'R'
            send_keystrokes(driver, 'R')
           # member.click()
            write_to_terminal(f"Healed {member.find_element(By.CSS_SELECTOR, '.cName').text}")

def mage_attack_strategy(driver):
    global attack_counter
    attack_counter = attack_counter + 1
    
    if attack_counter % 2 == 0:
        spellAttack(driver,'R')
    else:
        attack_nearest_monster(driver)
    
def attack_nearest_monster(driver):
    global attack_counter
    attack_counter = attack_counter + 1
    print(f'Attack Counter: {attack_counter}')
    try:
        quickAttack(driver)
        monsters = get_monsters(driver)
        if len(monsters) > 4:
            print("Too many monsters")
            resetDungeon(driver)
            return
        
        send_keystrokes(driver, 'Q')
        if attack_counter % 17 == 0:
            actions = ActionChains(driver).key_down(Keys.CONTROL).key_up(Keys.CONTROL).perform()
        elif attack_counter % 19 == 0:
            actions = ActionChains(driver).key_down(Keys.ALT).key_up(Keys.ALT).perform()
        elif attack_counter % 13 == 0:
            actions = ActionChains(driver).key_down('R').key_up('R').perform()
        for monster in monsters:
            attack_monster(driver, monster)
            break
            
    except:
        print("couldnt attack monster")

def spellAttack(driver, key):
    try:
        #quickAttack(driver)
        monsters = get_monsters(driver)
        #if len(monsters) > 4:
            #resetDungeon(driver)
        
        send_keystrokes(driver, key)
        for monster in monsters:
            attack_monster(driver, monster)
            break
            
    except:
        print("couldnt attack monster")


def quickAttack(driver):
    try:
        monsters = get_monsters(driver)
        for monster in monsters:
            attack_monster(monster)
            break
    except:
        print("Quick Attack Failed")



"""def automate_fighting(driver): #
    global fighting, fight_state, role #
    write_to_terminal(f"Fighting: {fighting}")
    write_to_terminal(f"Fight State: {fight_state}")

    if fighting:
        try:
            if is_in_town(driver):
                select_catacombs(driver)  # Enter the catacombs if in town

            # Get the current maze structure
            maze_grid = parse_maze(driver)  # Parse the maze from the HTML
            start_position = (0, 0)  # Starting position of the maze

            # Start exploring and fighting
            explore_and_fight(driver, maze_grid, start_position)

        except Exception as e:
            print(f"Error in automate_fighting: {e}")
        overlay.after(1000, lambda: automate_fighting(driver))  # Repeat the process with a delay"""



def automate_fighting(driver):
    global fighting, fight_state, role
    write_to_terminal(f"Fighting: {fighting}")
    write_to_terminal(f"Fight State: {fight_state}")
    
    if fighting:
        try:
            isLeader = is_leader(driver)
            print(f'Is Leader: {isLeader}')
            
            if is_in_town(driver):
                select_catacombs(driver)

            checkHealth(driver)
            
            #if not isLeader:
            #    wait_for_monsters()
            #else:
            #    engage_if_leader(driver)
            
            fight_based_on_role(driver, role)
            print('Check Items')
            
            # Check for dropped items
            drop_items = driver.find_elements(By.CSS_SELECTOR, ".dropItemsBox .itemBox")
            if drop_items:
                print('Found Items')
                scanDroppedItems(driver, drop_items)

            # Check for the engage button to trigger exploration
            if is_engage_button_visible(driver):
                print("Engage button found, clicking to return to the maze.")
                click_engage_button(driver)  # Click engage to return to the maze
                # Start maze exploration until a monster is encountered
                #explore_maze_until_monster(driver)
                explore_maze(driver)
        except Exception as e:
            print(f"Error in automate_fighting: {e}")
        
        overlay.after(1000, lambda: automate_fighting(driver))  # Repeat after delay


def checkHealth(driver):
    try:
        health_mana_data = get_health_mana(driver)
        
        if health_mana_data:
            hp = health_mana_data['hp']
            mp = health_mana_data['mp']
            
            write_to_terminal(f"-HP: {hp}")
            write_to_terminal(f"-MP: {mp}")
            print(f"-HP: {hp}")
            print(f"-MP: {mp}")
            
            if hp < 40:
                print("Fight: To ~> Town Heal <~")
                write_to_terminal("Fight: To ~> Town Heal <~")
                town_heal(driver)
                
            #if hp < 60:
                #fight_heal(driver, hp, mp)
            #if hp > 60 or mp < 30:
                #attack_switch(driver, hp, mp)
            
    except Exception as e:
        print(f"Error in checkHealthAndReact: {e}")

def cook():
    driver = setup_browser()
    startCooking(driver)

def fish():
    driver = setup_browser()
    startFishing(driver)


# Function to start fighting
def fight():
    global fighting, role
    
    driver = setup_browser()

    

    fighting = True
    print("Get Character Config")
    getCharacter(driver)
    role = CONFIG['class']
    
    # Scan inventory and equipment at the start
    update_character_json(driver)
    
    loot_threshold = loot_textbox.get() #Set loot threshold

    write_to_terminal("Fight!... ")
    automate_fighting(driver)


# Function to stop automation
def stop_automation():
    global fighting
    fighting = False
    write_to_terminal("Automation stopped by hotkey...")
    os._exit(0)

# Set up the GUI
overlay = tk.Tk()
overlay.title("Slash Hustler")
overlay.geometry("400x500+1450+530")
#overlay.attributes('-topmost', True)
overlay.attributes('-alpha', 0.7)
#overlay.overrideredirect(True)

fight_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Fight", command=fight)
fight_button.pack()

stop_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Stop", command=stop_automation)
stop_button.pack()

whistle_var = tk.BooleanVar(value=False)  # Set initial value to False
whistle_checkbox = tk.Checkbutton(overlay, text="Whistle", variable=whistle_var, bg='black', fg='white', font=('exocet', 9))
whistle_checkbox.pack()

fish_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Fish", command=fish)
fish_button.pack()

cook_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="cook", command=cook)
cook_button.pack()

tk.Label(overlay, text="Loot Threshold", bg='black', fg='white').pack(pady=1)
loot_textbox = tk.Entry(overlay, bg='black', fg='white')
loot_textbox.pack(pady=1)

terminal_output = tk.Text(overlay, bg='black', fg='white', font=('exocet', 9), wrap='word')
terminal_output.pack(expand=True, fill='both')

#sys.stdout = StdoutRedirector(terminal_output)

keyboard.add_hotkey('+', stop_automation)



# Start the monitoring thread (Updating Overlay Position) (Auto Minimize)
thread = threading.Thread(target=update_overlay_position)
thread.daemon = True
thread.start()

overlay.mainloop()