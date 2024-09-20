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
fight_state = 0
role = ''
attack_counter = 0
loot_threshold = 4

running = False
fighting = False
fishing = False
cooking = False

fighting_thread = None
fishing_thread = None
cooking_thread = None

CHARACTER_JSON_PATH = 'configs/MrHustle.json'  # Update this to get character name

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

        while counter<fishCount and cooking and running:
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

            #After loop - Continue cooking?
        if cooking and running:
            fishCount=dragToCook(driver)
            click_cook(driver)
            cooking_loop(driver,fishCount)

    except Exception as e:
        print(f'Failed cooking_loop : {e}')
        write_to_terminal(f"Failed cooking_loop: {e}")

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
                write_to_terminal(f'Cutting up {fishInt} fish to cook')
                
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
        write_to_terminal(f"Done Cooking")
    except Exception as e:
        print(f'Failed to start cooking: {e}')
        write_to_terminal(f"Failed to start cooking: {e}")

    
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
        time.sleep(.3)
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

def fishing_loop(driver):
    global fishing, running
    try:
        print(' - Fishing Loop - ')
        while fishing and running:
            time.sleep(.5)
            # Check if a snag occurred and click Snag Counter if necessary
            if check_snag(driver):
                print("Snag detected, clicking Snag Counter")
                click_snag_counter(driver)

                # Wait for the rod or reel progress to change before continuing to reel
                #reel_progress = check_reel_progress(driver)
                #while reel_progress == 100:  # Wait until reel progress changes
                #    print('Waiting for reel progress to change...')
                #    time.sleep(0.5)
                #    reel_progress = check_reel_progress(driver)
                
                #print('Reel progress changed, switching back to Reel')
            
            # Check Rod health and ensure it's not going to break
            #rod_health = check_rod_health(driver)
            #if rod_health < 10:  # If rod health is below 10%, stop reeling
            #    print(f"Rod health low! - {rod_health} - Stopping reel...")
            #    continue  # Skip the reel click to avoid breaking the rod
            
            # Click Reel button to reel in the fish
            print(' - Fishing Loop - click_reel')
            click_reel(driver)

            # Check if the fish has escaped and needs recasting
            try:
                #escape_text = driver.find_element(By.XPATH, "//div[contains(text(), 'Escaped the Hook')]")
                print("Trying to Recast line...")
                click_recast(driver)
            except:
                pass  # Ignore if the fish hasn't escaped

            # Small delay to avoid spamming
            time.sleep(0.3)
    except Exception as e:
        print(f'Failed fishing_loop : {e}')
        write_to_terminal(f"Failed fishing loop: {e}")


def startFishing(driver):
    try:
        if is_in_town(driver):
            selectFishingPond(driver)
        click_fish(driver)
        fishing_loop(driver)
        print('Done Fishing')
        write_to_terminal(f"Done fishing")
    except:
        pass

            
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
    write_to_terminal(f"characterName: {characterName}")

    charJsonPath = 'configs/' + characterName
    charJsonPath = charJsonPath + '.json'
    print(f'charJsonPath: {charJsonPath}')
    write_to_terminal(f"charJsonPath: {charJsonPath}")

    CHARACTER_JSON_PATH = charJsonPath
    CONFIG = loadConfig()
    loot_threshold = CONFIG["loot_threshold"]
    write_to_terminal(f"Loaded CONFIG loot_threshold=: {loot_threshold}")
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
        write_to_terminal(f"Successfully saved Config to: {CHARACTER_JSON_PATH}")
    except Exception as e:
        print(f"Error saving CONFIG to {CHARACTER_JSON_PATH}: {e}")
        write_to_terminal(f"Error saving CONFIG to: {CHARACTER_JSON_PATH}")

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
        write_to_terminal(f"Update JSON")
        write_to_terminal(f" -- Inventory: {fighting} \n -- ")
        write_to_terminal(f" -- Equipment: {equipped} \n -- ")
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
    write_to_terminal(f"Parsed Item Details: {item_details}")
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
    write_to_terminal(f"Parsed Equipped Details: {item_details}")
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
    write_to_terminal(f"|SCORE| {item_name}: ({score})")
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
        print('Attacked Monster')
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
            town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")  # Adjust selector as needed
            town_button.click()
        finally:
            print(" - Talking to Akara - ")
            write_to_terminal("Talking to Akara")
            time.sleep(7)  # Adjust healing time as needed
            health_mana_data = get_health_mana(driver)
            if health_mana_data:
                hp = health_mana_data['hp']
                mp = health_mana_data['mp']
                
                write_to_terminal(f"~Town Stats~")
                write_to_terminal(f"-HP: {hp}")
                write_to_terminal(f"-MP: {mp}")
                print(f"~Town Stats~")
                print(f"~HP: {hp}")
                print(f"-MP: {mp}")
                send_keystrokes(driver,"3")

                if hp < 95:
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
            write_to_terminal(f"Fight heal")
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
                write_to_terminal(f"In Town")
                return True
        return False
    except Exception:
        return False

# Function to check if engage button is visible
def is_engage_button_visible(driver):
    try:
        engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
        display_style = engage_button.get_attribute("style")
        if "display: block" in display_style:
            return True
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
        write_to_terminal("Too Many Monsters -- RESETTING DUNGEON --")
        town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")  
        #town_button = driver.find_element(By.XPATH, "//a[text()='Go to Town']")
        time.sleep(.3)
        town_button.click()
        town_button.click()
        print(f'Click Town_Button: {town_button}')
        town_button.click()
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
                        write_to_terminal("Create Group --")
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
                                        print('Left Group')
                                        write_to_terminal("Left Group --")
                                        time.sleep(30)
                        
    except Exception as e:
        print(f'Failed to Reset Dungeon: {e}')
    

def is_leader(driver):
    return bool(driver.find_elements(By.CSS_SELECTOR, ".cName.gLeader"))

def engage_if_leader(driver):
    if is_leader(driver):
        print('Try find engage as leader')
        write_to_terminal(f"Leader - Watching for Engage")
        if is_engage_button_visible(driver):
            engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")  # Update selector as needed
            if engage_button:
                engage_button.click()

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
    attack_counter += 1
    print(f'Attack Counter: {attack_counter}')
    try:
        quickAttack(driver)
        monsters = get_monsters(driver)
        if len(monsters) > 4:
            print("Too many monsters")
            resetDungeon(driver)
            return
            # Attempt to reduce the number of monsters or reset dungeon
            #actions = ActionChains(driver).key_down(Keys.SHIFT).key_up(Keys.SHIFT).perform()

        print('Less than 4 Monsters - Keep Fighting')
        # Remove modulo-based key presses
        if attack_counter % 4 == 0:
            send_keystrokes(driver, 'Q')
        if attack_counter % 17 == 0:
            actions = ActionChains(driver).key_down(Keys.CONTROL).key_up(Keys.CONTROL).perform()
        elif attack_counter % 19 == 0:
            actions = ActionChains(driver).key_down(Keys.ALT).key_up(Keys.ALT).perform()
        elif attack_counter % 13 == 0:
            pass
            #actions = ActionChains(driver).key_down('R').key_up('R').perform()
            
        # Remove modulo-based key presses

        # Check abilities and use them if percentage >=75%
        """abilities = get_abilities(driver)

        for ability in abilities:
            if 75 <= ability['percentage']:
                print(f"Using ability {ability['name']} with {ability['percentage']}%")
                ability_element = ability['element']
                # Click the ability element to activate it
                #ability_element.click()
                actions = ActionChains(driver).key_down(Keys.CONTROL).key_up(Keys.CONTROL).perform()
                time.sleep(0.5)  # Wait a bit
                # If you want to use only one ability per cycle, uncomment the next line
                # break """

        # Continue with attacking
        for monster in monsters:
            attack_monster(driver, monster)     # Attack first monster
            break

    except Exception as e:
        print(f"Couldn't attack monster: {e}")


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
            attack_monster(driver, monster)
            break
    except Exception as e:
        print(f"Quick Attack Failed: {e}")


def automate_fighting(driver):
    global fighting, fight_state, role
    write_to_terminal(f"Fighting: {fighting}")
    write_to_terminal(f"Fight State: {fight_state}")
    #update_overlay_position()
    
    while fighting and running:
        try:
            isLeader = is_leader(driver)
            print(f'Is Leader: {isLeader}')
            if is_in_town(driver):
                select_catacombs(driver)
        
            checkHealth(driver)
                #Print group health/mana data
                
            if not isLeader:
                wait_for_monsters()
            else:
                engage_if_leader(driver)
                
            fight_based_on_role(driver, role)
            print('Check Items')
            write_to_terminal(f"Looking for items")

            drop_items = driver.find_elements(By.CSS_SELECTOR, ".dropItemsBox .itemBox")
            if drop_items:
                print('Found Items')
                write_to_terminal(f"Drops: {drop_items}")
                scanDroppedItems(driver, drop_items)
        except:
            print('In Automate Fighting - Fighting Exception')
            break

def get_abilities(driver):
    try:
        abilities = []
        ability_elements = driver.find_elements(By.CSS_SELECTOR, ".botbar .bbAbility")
        for ability_element in ability_elements:
            # Get the ability name
            ability_name = ability_element.find_element(By.CSS_SELECTOR, ".abLabel").text.strip()
            # Get the ability percentage
            ability_percentage_text = ability_element.find_element(By.CSS_SELECTOR, ".abPerc").text.strip()
            ability_percentage = int(ability_percentage_text.strip('%'))
            # Store in list
            abilities.append({
                'name': ability_name,
                'percentage': ability_percentage,
                'element': ability_element
            })
        return abilities
    except Exception as e:
        print(f"Error in get_abilities: {e}")
        return []



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
                print("Fight: ~> Town Heal <~")
                write_to_terminal("Fight: ~> Town Heal <~")
                town_heal(driver)
                
            #if hp < 60:
                #fight_heal(driver, hp, mp)
            #if hp > 60 or mp < 30:
                #attack_switch(driver, hp, mp)
            
    except Exception as e:
        print(f"Error in checkHealthAndReact: {e}")



# Function to validate only integer input
def validate_input(threshold):
    if threshold.isdigit() or threshold == "":  # Allow only digits and empty input
        return True
    else:
        messagebox.showerror("Invalid Input", "Please enter an integer value.")
        return False

# Function to get and check the loot threshold value
def get_loot_threshold():
    global loot_threshold
    loot_threshold = loot_textbox.get()
    if loot_threshold == "":
        print('loot_threshold is empty. using 9 as default')
        write_to_terminal(f"loot_threshold: ({loot_threshold})is empty. using 9 as defaukt")
        loot_threshold = 9
    elif validate_input(loot_threshold) == False:
        print('Invalid Threshold. Using 9 as default.')
        write_to_terminal(f"Invalid Threshold: {loot_threshold}. Using 9 as default.")
        loot_threshold = 9
    else:
        loot_threshold = int(loot_threshold)  # Now it's safe to convert to integer
        print(f"Loot Threshold set to: {loot_threshold}")
        write_to_terminal(f"Loot Threshold set to: {loot_threshold}")

def run_fighting():
    global fighting, running, role
    driver = setup_browser()
    print("Get Character Config")
    getCharacter(driver)
    role = CONFIG['class']
    # Scan inventory and equipment at the start
    update_character_json(driver)
    get_loot_threshold()
    write_to_terminal("Fight!... ")
    automate_fighting(driver)

def run_fishing():
    driver = setup_browser()
    startFishing(driver)

def run_cooking():
    driver = setup_browser()
    startCooking(driver)


def cook():
    global cooking_thread, cooking, running

    cooking = True
    running = True

    cooking_thread = threading.Thread(target=run_cooking)
    cooking_thread.start()


def fish():
    global fishing_thread, fishing, running

    fishing = True
    running = True

    fishing_thread = threading.Thread(target=run_fishing)
    fishing_thread.start()


def fight():
    global fighting_thread, fighting, running, role

    fighting = True
    running = True

# Start a new thread for the fighting logic
    fighting_thread = threading.Thread(target=run_fighting)
    fighting_thread.start()

def stop_automation():
    global fighting, fishing, cooking, running
    fighting = False
    fishing = False
    cooking = False
    running = False
    write_to_terminal("Automation stopped by Stop button or hotkey.")


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

terminal_output = tk.Text(overlay, bg='black', fg='white', font=('arial', 11), wrap='word')
terminal_output.pack(expand=True, fill='both')

#sys.stdout = StdoutRedirector(terminal_output)

keyboard.add_hotkey('+', stop_automation)

overlay.mainloop()