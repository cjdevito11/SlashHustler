import tkinter as tk
from tkinter import ttk
from tkinter import simpledialog
import pyautogui
import time
import json
import os
import pytesseract
from PIL import Image, ImageTk
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
import colorama
from colorama import Fore, Back, Style
from tkinter import messagebox
from ttkthemes import ThemedStyle

colorama.init()

UNDERLINE = '\033[4m'
RESET = '\033[0m'
FRED = '\033[31m'
FGREEN = '\033[32m'
FYELLOW = '\033[33m'
FBLUE = '\033[34m'
FMAGENTA = '\033[35m'
FCYAN = '\033[36m'
FWHITE = '\033[37m'
FBLACK = ''

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
fishingLevel = 1
whistle = False
autoStat = False


running = False
fighting = False
fishing = False
cooking = False

fighting_thread = None
fishing_thread = None
cooking_thread = None

#CHARACTER_JSON_PATH = 'configs/MrHustle.json'  # Update this to get character name
CHARACTER_JSON_PATH = 'configs/HustlerWolfie.json'  # Update this to get character name
#CHARACTER_JSON_PATH = 'configs/TigBittyBroad.json'  # Update this to get character name
STAT_JSON_PATH = 'configs/autoStat/paladin/basic.json'


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

abilitiesMap = {
    "row1": ["powerstrike", "bottomsup", "topsmash", "knockdown", "retribution", "healrage"],
    "row2": ["backstab", "backastrophe", "multistrike", "twohitback", "revenge", "doublestrike"],
    "row3": ["crossstrike", "pathslash", "jumpattack", "wildswing", "slapdash", "xin"],
    "row4": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"],
    "row5": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"],
    "row6": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"]
}
flattened_abilities = abilitiesMap["row1"] + abilitiesMap["row2"] + abilitiesMap["row3"] + abilitiesMap["row4"] + abilitiesMap["row5"] + abilitiesMap["row6"]

# Directory paths
main_config_path = 'configs'
auto_stat_path = os.path.join(main_config_path, 'autoStat')

#CONFIG GUI
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def save_json(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def get_config_files():
    return [f.split('.')[0] for f in os.listdir('configs') if f.endswith('.json')]

# CONFIG GUI

# Function to load JSON files
def load_json_files(directory):
    json_files = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".json"):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    try:
                        json_files[file] = json.load(f)
                    except Exception as e:
                        print(f"Error loading {file}: {e}")
                        messagebox.showerror("Error", f"Could not load {file}: {e}")
    return json_files

def load_scoring_system():
    with open('jsons/itemScore.json', 'r') as file:
        scoring_system = json.load(file)
        print('Loaded scoring system:', json.dumps(scoring_system, indent=4))  # Print the entire JSON for debugging
        return scoring_system

# Function to read the configuration file
def load_stats_config(file_path):
    try:
        with open(file_path, 'r') as config_file:
            return json.load(config_file)
    except Exception as e:
        print(f"Error loading config: {e}")
        return None


scoring_system = load_scoring_system()


#### CONFIRM WINDOWS ###

def canSeeStats(driver):
    try:
        stats = driver.find_elements(By.CLASS_NAME, "pbStats")
        if stats:
            return True
        else:
            return False
    except Exception as e:
        print (f"Can't see Stats: {e}")
        return False

def canSeeInventory(driver):
    try:
        inventory = driver.find_elements(By.CLASS_NAME, "pbInv")
        if inventory:
            return True
        else:
            return False
    except Exception as e:
        print (f"Can't see Inventory: {e}")
        return False

def canSeeShrine(driver):
    try:
        shrine = driver.find_elements(By.CLASS_NAME, "pbShrine")
        if shrine:
            return True
        else:
            return False
    except Exception as e:
        print (f"Can't see Shrine: {e}")
        return False
    
def canSeeVault(driver):
    try:
        vault = driver.find_elements(By.CLASS_NAME, "pbVault")
        if vault:
            return True
        else:
            return False
    except Exception as e:
        print (f"Can't see Vault: {e}")
        return False
    
def canSeeMarket(driver):
    try:
        market = driver.find_elements(By.CLASS_NAME, "pbMarket")
        if market:
            return True
        else:
            return False
    except Exception as e:
        print (f"Can't see Market: {e}")
        return False
#### CONFIRM WINDOWS ###


#### AUTO SKILL ####

def map_abilities(driver):
    try:
        # Find all the ability icons in the order they appear in the HTML
        ability_icons = driver.find_elements(By.CSS_SELECTOR, "div.cp.abilityIcon")
        
        # Make sure we have the same number of ability icons as in the abilities map
        if len(ability_icons) != len(flattened_abilities):
            print(f"Mismatch in number of abilities: found {len(ability_icons)} icons, expected {len(flattened_abilities)}.")
            return
        
        # Create a mapping of the ability icons to their respective names from the flattened abilities list
        ability_mapping = {}
        for index, icon in enumerate(ability_icons):
            # Map the icon to its corresponding ability based on the order
            ability_name = flattened_abilities[index]
            ability_mapping[ability_name] = icon

        print("Ability mapping completed successfully!")
        print(ability_mapping)
        
        return ability_mapping

    except Exception as e:
        print(f"Error mapping abilities: {e}")
        return None

# Function to get current levels of abilities based on the order in abilitiesMap
def read_ability_levels(driver):
    try:
        # Find all the ability icons
        ability_icons = driver.find_elements(By.CSS_SELECTOR, "div.cp.abilityIcon")

        # Dictionary to store current ability levels
        current_levels = {}

        # We assume the abilities are mapped in the same order as in abilitiesMap
        for index, icon in enumerate(ability_icons):
            try:
                level_element = icon.find_element(By.CLASS_NAME, 'stAbLvl')  # Find the level element
                ability_level = int(level_element.text.strip())  # Get the level as an integer
                ability_name = flattened_abilities[index]  # Map it to the correct ability name based on the order
                current_levels[ability_name] = ability_level  # Store the level in the dictionary
                print(f"{ability_name}: Lvl({ability_level})")
            except Exception as e:
                # Handle the case where the level element is not found or there's an error
                ability_name = flattened_abilities[index]  # Get the ability name from abilitiesMap
                current_levels[ability_name] = 0  # Set the level to 0 or any default value
                print(f"Error reading level for ability {ability_name}: {e}")

        return current_levels

    except Exception as e:
        print(f"Error reading ability levels: {e}")
        return {}
    

# Function to spend ability points based on thresholds from JSON
def spend_ability_points_based_on_thresholds(driver, ability_mapping, points_to_spend, skill_thresholds, current_levels):
    print('Spend_ability_points')
    try:
        # Normalize skill thresholds and current levels by converting all keys to lowercase
        skill_thresholds = {key.lower(): value for key, value in skill_thresholds.items()}
        current_levels = {key.lower(): value for key, value in current_levels.items()}
        
        # Iterate through abilities in the skill thresholds
        for ability, max_threshold in skill_thresholds.items():
            if points_to_spend <= 0:
                break

            current_level = current_levels.get(ability, 0)  # Fetch the current level of the ability
            print(Fore.BLUE + f'current_level for {ability}: {current_level}' + Style.RESET_ALL)
            
            # Check if current ability level is below the defined threshold
            if current_level < max_threshold:
                print(f'{ability}: Current Level < max Threshold - SPEND POINT')
                points_needed = max_threshold - current_level
                points_to_allocate = min(points_needed, points_to_spend)

                # Find the corresponding ability icon and click it to allocate points
                if ability in ability_mapping:
                    print(f'ability: {ability}')
                    ability_icon = ability_mapping[ability] 
                    print(f'ability_icon: {ability_icon}')
                    
                    for _ in range(points_to_allocate):
                        try:
                            # Use the same method you use for other clicks (direct click)
                            print(f'Try to click Ability Icon : {ability_icon}')
                            ability_icon.click()
                            points_to_spend -= 1
                            print(Fore.GREEN + f"Allocated a point to {ability}. Points remaining: {points_to_spend}" + Style.RESET_ALL)
                            time.sleep(1)  # Delay to prevent rapid clicks
                        except Exception as e:
                            print(f"Failed to click {ability_icon} for {ability}: {e}")
                            continue

                    if points_to_spend <= 0:
                        break

        if points_to_spend == 0:
            print("All points allocated successfully.")
        else:
            print(f"Remaining points: {points_to_spend}.")
    
    except Exception as e:
        print(f"Error spending ability points based on thresholds: {e}")

# Combined function for auto stat and ability allocation
def auto_stat_and_ability_allocation(driver, config_path):
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    try:
        # Step 1: Load the JSON config to get skill thresholds
        config = load_stats_config(config_path)
        if not config:
            return

        skill_thresholds = config.get("skills", {})

        # Step 2: Read current player stats (to get ability points)
        current_stats = readPlayerStats(driver)
        ability_points = current_stats.get("ability_points", 0)

        print(f"Ability points available: {ability_points}")

        # Step 3: Check if there are any ability points to spend
        if ability_points > 0:
            # Step 4: Map abilities in the UI
            ability_mapping = map_abilities(driver)

            if ability_mapping:
                # Step 5: Read current ability levels from the UI
                current_ability_levels = read_ability_levels(driver)

                print(f'ability_mapping: {ability_mapping}')
                print(Fore.BLUE + f'ability_points: {ability_points}' + Style.RESET_ALL)
                print(f'skill_thresholds: {skill_thresholds}')
                print(Fore.BLUE + f'current_ability_levels: {current_ability_levels}' + Style.RESET_ALL)
                print('spend_ability_points_based_on_thresholds(driver, ability_mapping, ability_points, skill_thresholds, current_ability_levels)')
                # Step 6: Spend ability points based on the thresholds in the JSON
                spend_ability_points_based_on_thresholds(driver, ability_mapping, ability_points, skill_thresholds, current_ability_levels)
            else:
                print("Failed to map abilities.")
        else:
            print("No ability points available to spend.")

    except Exception as e:
        print(f"Error in auto stat and ability allocation: {e}")




#### AUTO SKILL ####

#### AUTO STAT ####

def readPlayerStats(driver):
    try:
        stats = {
            "level": 0,
            "exp": 0,
            "next_level": 0,
            "str": 0,
            "dex": 0,
            "int": 0,
            "vit": 0,
            "stat_points": 0,
            "ability_points": 0,
            "kills": 0,
            "deaths": 0,
            "damage": "0 to 0",  # Treat as string for range
            "physical_def": "0 to 0",  # Treat as string for range
            "magical_def": "0 to 0"  # Treat as string for range
        }

        # Retrieve and parse each stat
        stats["level"] = int(driver.find_element(By.ID, "CS0").text.strip())
        stats["exp"] = int(driver.find_element(By.ID, "CS1").text.strip())
        stats["next_level"] = int(driver.find_element(By.ID, "CS2").text.strip())
        stats["str"] = int(driver.find_element(By.ID, "CS3").text.strip())
        stats["dex"] = int(driver.find_element(By.ID, "CS4").text.strip())
        stats["int"] = int(driver.find_element(By.ID, "CS5").text.strip())
        stats["vit"] = int(driver.find_element(By.ID, "CS6").text.strip())
        stats["stat_points"] = int(driver.find_element(By.ID, "CS7").text.strip())
        stats["ability_points"] = int(driver.find_element(By.ID, "CS8").text.strip())
        stats["kills"] = int(driver.find_element(By.ID, "CS9").text.strip())
        stats["deaths"] = int(driver.find_element(By.ID, "CS10").text.strip())
        
        # Damage and defense are ranges, so handle them as strings
        stats["damage"] = driver.find_element(By.ID, "CS11").text.strip()
        stats["physical_def"] = driver.find_element(By.ID, "CS12").text.strip()
        stats["magical_def"] = driver.find_element(By.ID, "CS13").text.strip()

        return stats
    except Exception as e:
        print(f"Error reading player stats: {e}")
        return stats  # Return the stats dictionary with default values if there's an issue
    



def spendStatPoints(driver, config_path):
    try:
        # Load config
        config = load_stats_config(config_path)
        if config is None:
            return

        desired_vitality = config["stats"].get("vitality", 0)
        desired_strength = config["stats"].get("strength", 0)
        desired_dexterity = config["stats"].get("dexterity", 0)
        desired_intelligence = config["stats"].get("intelligence", 0)

        # Get current stats
        current_stats = readPlayerStats(driver)
        vitality = current_stats["vit"]  # Current vitality
        strength = current_stats["str"]  # Current strength
        dexterity = current_stats["dex"]
        intelligence = current_stats["int"]
        stat_points = current_stats["stat_points"]  # Available stat points

        # Distribute stat points
        points_to_vitality = max(0, desired_vitality - vitality)
        points_to_strength = max(0, desired_strength - strength)
        points_to_dexterity = max(0,desired_dexterity - dexterity)
        points_to_intelligence = max(0, desired_intelligence - intelligence)

        print(f'desired_vitality: {desired_vitality}    -   desired_strength: {desired_strength}    -   desired_dexterity: {desired_dexterity}  - desired_intelligence: {desired_intelligence}')
        print(f'vitality: {vitality}    -   strength: {strength}    -   dexterity: {dexterity}  - Intelligence: {intelligence}')
        print(f'points_to_vitality: {points_to_vitality}    -   points_to_strength: {points_to_strength}    -   points_to_dexterity: {points_to_dexterity}  - points_to_intelligence: {points_to_intelligence}')
        
        total_points_needed = points_to_vitality + points_to_strength + points_to_dexterity + points_to_intelligence

        if total_points_needed <= 0:
            print("Stats already at desired levels.")
            return

        # Allocate points with re-finding elements to prevent stale element reference
        while stat_points > 0:
            if points_to_vitality > 0:
                print('Add to vitality')
                # Wait until the vitality button is clickable, then click it
                vitality_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS6 svg"))
                )
                vitality_button.click()
                points_to_vitality -= 1
                stat_points -= 1

            elif points_to_strength > 0:
                print('Add to strength')
                # Wait until the strength button is clickable, then click it
                strength_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS3 svg"))
                )
                strength_button.click()
                points_to_strength -= 1
                stat_points -= 1

            elif points_to_dexterity > 0:
                print('Add to dexterity')
                # Wait until the dexterity button is clickable, then click it
                dexterity_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS4 svg"))
                )
                dexterity_button.click()
                points_to_dexterity -= 1
                stat_points -= 1
            elif points_to_intelligence > 0:
                print('Add to intelligence')
                # Wait until the intellligence button is clickable, then click it
                intelligence_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS3 svg"))
                )
                intelligence_button.click()
                points_to_intelligence -= 1
                stat_points -= 1

            # Re-check stat points to ensure they are still available
            current_stats = readPlayerStats(driver)
            stat_points = current_stats["stat_points"]

        print("Stat points allocated successfully.")

    except Exception as e:
        print(f"Error spending stat points: {e}")

# FISHING INVENTORY TRASH FISH HOTKEY3 FISH

def is_inventory_full(driver):
    # Locate the invItemsWrap container
    print('Is Inv Full?')

    inv_items_wrap = driver.find_element(By.CLASS_NAME, "invItemsWrap")
    
    # Locate all itemSlotBox elements within invItemsWrap
    item_slots = inv_items_wrap.find_elements(By.CLASS_NAME, "itemSlotBox")
    
    # Filter out any hidden or unused slots (only count visible slots)
    visible_slots = [slot for slot in item_slots if slot.is_displayed()]
    
    # Print debugging information about the inventory slots
    print(f"------ inv_items_wrap={inv_items_wrap}")
    #print(f"------ visible_slots={visible_slots}")
    
    # Count the number of filled slots (slots that contain an itemBox)
    filled_slots = [slot for slot in visible_slots if slot.find_elements(By.CLASS_NAME, "itemBox")]
    
    print(f"Filled slots: {len(filled_slots)} out of {len(visible_slots)}")  # Debugging output
    
    # Inventory is considered full if all visible slots are filled
    return len(filled_slots) == len(visible_slots)

def check_inventory_during_fishing(driver):  
    if is_inventory_full(driver):  # Assuming you already have a function to check if the inventory is full
        print("Inventory full, trashing excess fish.")
        manage_fish_inventory(driver)
    #time.sleep(5)  # Wait for 5 seconds before the next inventory check (you can adjust this)

def get_trash_can_element(driver):
    print("Locating the trash can...")
    inv_items_wrap = driver.find_element(By.CLASS_NAME, "invItemsWrap")
    print(f"Found invItemsWrap: {inv_items_wrap}")
    
    inv_sides = inv_items_wrap.find_elements(By.CLASS_NAME, "invIWSide")
    print(f"Found {len(inv_sides)} invIWSide elements.")
    
    if len(inv_sides) >= 2:
        trash_can = inv_sides[1]  # Select the second invIWSide as the trash can
        print(f"Trash can located: {trash_can}")
        return trash_can
    else:
        raise Exception("Could not find the trash can element.")

def manage_fish_inventory(driver):
    print("Inventory full, managing fish...")
    try:
        # Wait for the inventory to be visible
        WebDriverWait(driver, 4).until(
            EC.presence_of_element_located((By.CLASS_NAME, "invItemsBox"))
        )
        print("Inventory box found.")

        # Locate all fish items in the inventory
        fish_elements = driver.find_elements(By.XPATH, "//div[@class='itemBox cp'][.//img[@src='svg/iconFish.svg']]")
        print(f"Found {len(fish_elements)} fish in the inventory.")

        # Ensure there are fish to remove
        if len(fish_elements) == 0:
            print("No fish found in inventory, cannot trash excess fish.")
            return

        # Locate the hotkey 3 slot
        #hotkey_3 = WebDriverWait(driver, 10).until(
        #    EC.presence_of_element_located((By.XPATH, "//div[@class='qSlotBox' and @slot='2']"))
        #)
        #print("Hotkey 3 slot found.")

        # Loop through the fish elements and move or delete the fish
        for fish in fish_elements:
            try:
                # Get the quantity of fish
                quantity_element = fish.find_element(By.CLASS_NAME, "iQnt.ds2")
                fish_quantity = int(quantity_element.text)
                print(f"Fish quantity: {fish_quantity}")

                            # Check if fish quantity is greater than or equal to 20
                            #if fish_quantity >= 20:
                            #    print(f"Moving fish with quantity {fish_quantity} to hotkey 3.")
                                # Perform drag and drop to move the fish to hotkey 3
                            #    ActionChains(driver).drag_and_drop(fish, hotkey_3).perform()
                            #else:
                
                # Check if fish quantity is less than 20 (since you are trashing it)
                print(f"Trashing fish with quantity {fish_quantity}.")
                
                # Click and hold the fish
                print('Click And Hold Fish')
                actions = ActionChains(driver)
                actions.click_and_hold(fish).perform()
                time.sleep(.2)

                # Locate the trash can
                trash = get_trash_can_element(driver)
                print(f'Trash Can: {trash}')
                time.sleep(.2)

                # Move the mouse over the trash can
                print('Move mouse over trash')
                actions.move_to_element(trash).perform()
                time.sleep(.2)

                # Release the fish into the trash can
                print('Release Mouse')
                actions.release().perform()
                time.sleep(.2)

                print(f'Trashed fish with quantity {fish_quantity}.')
                    
            except Exception as e:
                print(f"Error processing fish: {e}")
                continue

    except Exception as e:
        print(f"Error in manage_fish_inventory: {e}")

def move_fish_to_hotkey_3(driver, item_img):
    # Locate the element for hotkey 3 (slot 2)
    hotkey_3_element = driver.find_element(By.CSS_SELECTOR, 'div.qSlotBox[slot="2"]')

    # Perform drag and drop action to move the fish item to hotkey 3
    actions = ActionChains(driver)
    actions.drag_and_drop(item_img, hotkey_3_element).perform()
    time.sleep(1)  # Optional: small delay between actions
    print("Moved fish to hotkey 3")


# COOKING

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
        print(Fore.RED + f'temperature_width: {temperature_width}' + Style.RESET_ALL)
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
                print(Fore.RED + "Flame detected, clicking Flame Counter" + Style.RESET_ALL)
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
                print(Fore.GREEN + f'Found fish with quantity: {fish_quantity}' + Style.RESET_ALL)
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
        print(Fore.RED + f'Failed to move fish to cooking popup item box: {e}' + Style.RESET_ALL)



def startCooking(driver):
    try:
        if is_in_town(driver):
            selectCooking(driver)
        
        # Move fish from inventory to the oven before starting cooking and get quanty
        fishCount=dragToCook(driver)

        # Start cooking after placing the fish in the oven
        click_cook(driver)
        cooking_loop(driver,fishCount)
        print(Fore.BLUE + 'Done Cooking' + Style.RESET_ALL)
        write_to_terminal(f"Done Cooking")
    except Exception as e:
        print(Fore.RED + f'Failed in startCooking: {e}' + Style.RESET_ALL)
        write_to_terminal(f"Failed in startCooking: {e}")

 # FISHING 
    
def check_snag(driver):
    try:
        print('check_snag')
        # Check if the Snag element is present
        snag_element = driver.find_element(By.CLASS_NAME, "damageText")
        print(Fore.BLUE + 'Found Snag' + Style.RESET_ALL)
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
        print(Fore.BLUE + 'click_snag' + Style.RESET_ALL)
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
        print(Fore.RED + 'click_recast' + Style.RESET_ALL)
        recast_button = driver.find_element(By.XPATH, "//a[text()='Recast Line']")
        if recast_button:
            # Add your inventory checking logic before continuing
            print("CHECKING INVENTORY FOR FULL FISH***************************************...")
            check_inventory_during_fishing(driver)
            print("DONE CHECKING INVENTORY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ...")
            
            # Check inventory if full
            #if is_inventory_full(driver):
            #    print("Inventory full, trashing excess fish.")
            #    manage_fish_inventory(driver)
            #    return  # Exit the function after handling inventory
            
            print('click_recast')
            # Find and click the Recast Line button
            
            recast_button.click()  # Perform the click action
            
    except Exception as e:
        print(f'Error in click_recast:')


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

def fishing_loop(driver, townHeal = False):
    global fishing, running
    counter = 0
    try:
        print(' - Fishing Loop - ')
        while fishing and running:
            time.sleep(.4) # was 3 - test at different numbers for time between reels & snags
            if check_snag(driver):
                print("Snag detected, clicking Snag Counter")
                click_snag_counter(driver)
            print(' - Fishing Loop - click_reel')
            click_reel(driver)
                # Wait for the rod or reel progress to change before continuing to reel
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
            counter+=1 
            if counter % 100 == 0:
                print('Check if still fishing')
                if is_in_town(driver):
                    print('WAS IN TOWN!!!')
                    startFishing(driver, townHeal)
                    return
            try:
                if townHeal & isHealthAbove(driver,90):
                    print(Fore.BLUE + 'Healed - Stop fishing' + Style.RESET_ALL)
                    return
                #escape_text = driver.find_element(By.XPATH, "//div[contains(text(), 'Escaped the Hook')]")
                print("Trying to Recast line...")
                click_recast(driver)
                
            except:
                print('couldnt recast line')  # Ignore if the fish hasn't escaped

            # Small delay to avoid spamming
            time.sleep(0.3)
    except Exception as e:
        print(f'Failed fishing_loop : {e}')
        write_to_terminal(f"Failed fishing loop: {e}")

#<input title="" type="text" class="skLvlTxt" maxlength="2">

def setFishingLevel(driver):
    global fishingLevel
    try:
        if fishingLevel > 1:
            fishLevel = driver.find_element(By.CLASS_NAME, "skLvlTxt")
            time.sleep(.2)
            fishLevel.clear()
            time.sleep(.2)
            fishLevel.send_keys(str(fishingLevel))
            time.sleep(.2)
    except:
        print('Failed to set fishing level')


def startFishing(driver, townHeal = False):
    try:
        time.sleep(1)
        if is_in_town(driver):
            selectFishingPond(driver)
        setFishingLevel(driver)
        click_fish(driver)
        fishing_loop(driver, townHeal)
        fishingToTown(driver)
    except:
        print('Failed to click Fish to town button')

            
# Selenium setup
def setup_browser():
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "localhost:9222")
    driver = webdriver.Chrome(options=chrome_options, service=Service(r"C:\Windows\System32\chromedriver.exe"))
    return driver

def write_to_terminal(message):
    print(f'WTT: {message}')
    #terminal_output.insert(tk.END, message + '\n')
    #terminal_output.see(tk.END)

def getCharacter(driver):
    global CHARACTER_JSON_PATH, CONFIG, loot_threshold, whistle, autoStat, fishingLevel

    characterName = driver.find_element(By.CSS_SELECTOR, ".cName").text
    print(Fore.BLUE + f'characterName: {characterName}' + Style.RESET_ALL)
    #write_to_terminal(f"characterName: {characterName}")

    charJsonPath = 'configs/' + characterName + '.json'
    print(Fore.GREEN + f'charJsonPath: {charJsonPath}' + Style.RESET_ALL)
    #write_to_terminal(f"charJsonPath: {charJsonPath}")

    CHARACTER_JSON_PATH = charJsonPath

    ## SET GLOBAL CONFIG VARIABLES ##
    CONFIG = loadConfig()
    loot_threshold = CONFIG["loot_threshold"]
    whistle = CONFIG["whistle"]
    autoStat = CONFIG["auto_stat"]
    fishingLevel = CONFIG["fishing_level"]

    write_to_terminal(f"Loaded CONFIG =: {CONFIG}")
    print('* - * - * - READ CONFIG - SETTING GLOBAL VARIABLES = ')
    print(f'autoStat : {autoStat}')
    print(f'whistle : {whistle}')
    print(f'fishingLevel : {fishingLevel}')
    print(Fore.GREEN + f'loot_threshold : {loot_threshold}' + Style.RESET_ALL)
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
        # Retrieve character information
        className = get_class(driver)

        if canSeeInventory(driver) == False:
            print('CANT SEE INVENTORY PRESS I')
            send_keystrokes(driver, 'i') #Open Inv Window

        print('Scan Equipment Next')
        equipped = scanEquippedItems(driver)

        print('Scan Inventory Next')
        inventory = scanInventoryItems(driver)

        CONFIG["inventory"] = inventory
        CONFIG["equipment"] = equipped
        CONFIG["class"] = className

        print(f"New Inventory: {CONFIG['inventory']}")
        print(f"New Equipment: {CONFIG['equipment']}")
        print(f"New Class: {CONFIG['class']}")
        
        write_to_terminal(f"Update JSON")
        write_to_terminal(f" -- Inventory: {inventory} \n -- ")
        write_to_terminal(f" -- Equipment: {equipped} \n -- ")
        write_to_terminal(f" -- New Class {className} \n -- ")

        saveConfig()
        print(f"Character JSON updated and saved.")
    except Exception as e:
        print(f"Error updating character JSON: {e}")

def get_class(driver):
    global STAT_JSON_PATH
    try:
        if canSeeStats(driver) == False:
            print('Cant See Stats Window - Press C')
            send_keystrokes(driver, 'c') #Open Stats Window
        print('Get Class Name')
        character_element = driver.find_element(By.XPATH, "//div[@class='cStats'][1]")
        class_name_element = character_element.find_element(By.XPATH, ".//div[2]")
        class_name = class_name_element.text.strip()
        print(" ---GET CLASS INFO---")
        print(" ---GET CLASS INFO---")
        print(" ---GET CLASS INFO---")
        print(f"class_name = {class_name} ---GET CLASS INFO---")
        STAT_JSON_PATH = f'configs/autoStat/{class_name}/basic.json'
        print(f'----------={STAT_JSON_PATH}---------------')
        time.sleep(10)
        return class_name
    except Exception as e:
        print(f"Error getting class!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! {e}")
  

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
    #rite_to_terminal(f"Parsed Item Details: {item_details}")
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
                    print(Fore.RED + f"Unknown stat format, skipping: {text}" + Style.RESET_ALL)
            except Exception as e:
                print(Fore.RED + f"Error parsing stat '{text}': {e}" + Style.RESET_ALL)

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

            #if itemLevel >= 5:
            #    item_score = item_score * 1.75
            #if itemLevel >= 10:
            #    item_score = item_score * 1.75
            #if itemLevel >= 15:
            #    item_score = item_score * 1.75
            #if itemLevel >= 20:
            #    item_score = item_score * 1.75.
            #if itemLevel >= 25:
            #    item_score = item_score * 1.75
            #if itemLevel >= 30:
            #    item_score = item_score * 1.75
            #if itemLevel >= 35:
            #    item_score = item_score * 1.75
            #if itemLevel >= 40:
            #    item_score = item_score * 1.75
            #if itemLevel >= 45:
            #    item_score = item_score * 1.75
            #if itemLevel >= 50:
            #    item_score = item_score * 1.75
            #if itemLevel >= 55:
            #    item_score = item_score * 1.75

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
    try:
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
                print(Fore.CYAN + f"~~~~ Item Dropped: {parsedItem['name']}    -   Score: {item_score} ~~~~" + Style.RESET_ALL)
                write_to_terminal(f"~~~~ Item Dropped: {parsedItem['name']}    -   Score: {item_score} ~~~~")
                print('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
                    # Log the item to file
                log_item_to_file(parsedItem, item_score, log_filename)


                print(f'Check if item_score > loot_threshold -------------- {item_score} > {loot_threshold}')
                    # Decide if the item should be looted
                if item_score > loot_threshold:
                    print('TRY TO LOOT ITEM: {item}')
                    loot_item(driver, item)
    except:
        print('Error in scanDroppedItems : Most likely to do with a dropped item not being there still to hover after time')



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
    print(Fore.BLUE + f'~~~~~~~~~~~~~~~~~~~ Calculating Item Score ~~~~~~~~~~~~~~~~~' + Style.RESET_ALL)
    print(Fore.BLUE + f'~~~~~~~~~~~~~~~~~~ Item Name : {item_name} ~~~~~~~~~~~~~~~~' + Style.RESET_ALL)
    print(Fore.BLUE + f'~~~~~~~~~~~~~~~~~~ Item Details : {item_details} ~~~~~~~~~~~~~~~~' + Style.RESET_ALL)
    print(Fore.BLUE + f'------------------' + Style.RESET_ALL)

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
                
                print(Fore.GREEN + f'Stat value extracted: {stat_value}' + Style.RESET_ALL)
            except Exception as e:
                stat_value = 1  # Default to 1 if parsing fails
                print(Fore.RED + f'Error parsing stat value for {normalized_stat}, defaulting to 1. Error: {e}' + Style.RESET_ALL)

            # Apply score modifier based on the extracted value from JSON
            stat_score = scoring_system[normalized_stat].get(str(stat_value), 0)
            print(f'{UNDERLINE}Modifier for {Fore.YELLOW}{normalized_stat}{RESET}{UNDERLINE} with value {stat_value}: {Fore.YELLOW}{stat_score}{RESET}')
            score += stat_score
        else:
            # Print out the keys available in the scoring system for debugging
            print(Fore.RED + f"Stat '{normalized_stat}' not found in scoring system. " + Style.RESET_ALL)
            #Available stats: {list(scoring_system.keys())}")
    
    print(Fore.MAGENTA + f'Final calculated score for {item_name}: {score}' + Style.RESET_ALL)
    #write_to_terminal(f"|SCORE| {item_name}: ({score})")
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

def isHealthAbove(driver,testhp):
    try:
        health_mana_data = get_health_mana(driver)
        if health_mana_data:
            hp = health_mana_data['hp']
            print(Fore.BLUE + ' * - - isHealthBelow {testhp}? ' + Style.RESET_ALL)
            if hp >= testhp:
                print(f'- Yes. HP = {hp}')
                return True
            else:
                print(f'- No. HP = {hp}')
                return False
    except:
        pass

def isHealthBelow(driver,testhp):
    try:
        health_mana_data = get_health_mana(driver)
        if health_mana_data:
            hp = health_mana_data['hp']
            print(Fore.BLUE + ' * - - isHealthBelow {testhp}? ' + Style.RESET_ALL)
            if hp >= testhp:
                print(f'- No. HP = {hp}')
                return False
            else:
                print(f'- Yes. HP = {hp}')
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

            #write_to_terminal(f"Monster: {monster_name}, Health: {health_percentage}%")
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
        #write_to_terminal(f"Attacking monster: {monster['name']}")
        actions = ActionChains(driver)
        actions.move_to_element(monster["element"]).click().perform()
        print(Fore.RED + 'Attacked Monster' + Style.RESET_ALL)
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
        
        #write_to_terminal(f"Sent keystrokes: {keys}")
    except Exception as e:
        write_to_terminal(f"Error sending keystrokes: {e}")

# Function to go to town for healing
def town_heal(driver):
    try:
        try:
            town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")
            town_button.click()
            time.sleep(2)
            town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")
            town_button.click()
            time.sleep(2)
            heal_fish(driver)                                  # UNCOMMENT TO START TOWN HEAL + FISH LOOP
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

                if hp < 90:
                    print("~~ Loop TownHeal ~~")
                    town_heal(driver)
                    return
            print(Fore.BLUE + 'Town Heal: Stop Fishing' + Style.RESET_ALL)
            #time.sleep(1)
            #stop_fishing()                                         # TOWN HEAL + FISH LOOP END
            #time.sleep(5)
            #print('Town Heal: Fishing To Town')
            #fishingToTown(driver)
            
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

# Function to cook fish

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
    print(Fore.BLUE + 'Done Fishing -> fishingToTown' + Style.RESET_ALL)
    try:
        fishToTownButton = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.fishBTT")
        print('click to town')
        if fishToTownButton:
            time.sleep(1)
            fishToTownButton.click()
            print('button clicked')
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
        

def checkForDungeonReset(driver, maxMonsters = 4):
    try:
        monsters = get_monsters(driver)
        if len(monsters) > maxMonsters:
            print(f"Too many monsters {len(monsters)} > {maxMonsters}- Automate Fighting - ")
            resetDungeon(driver)
            print('Dungeon reset')
            time.sleep(5)
    except:
        print("checkForDungeonReset exception")

#Too many monsters, reset dungeon
def resetDungeon(driver):
    try:
        print(Fore.RED + '-- TOO MANY MONSTERS -- resetDungeon() --' + Style.RESET_ALL)
        write_to_terminal("Too Many Monsters -- RESETTING DUNGEON --")
        town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")  
        #town_button = driver.find_element(By.XPATH, "//a[text()='Go to Town']")
        time.sleep(.3)
        town_button.click()
        town_button.click()
        print(f'Click Town_Button: {town_button}')
        town_button.click()
        town_button.click()
        print(f'Click Town_Button: {town_button}')
        time.sleep(2)
    except:
        print(Fore.RED + 'Couldnt leave catacombs' + Style.RESET_ALL)

    print('Try to reset w/ group')
    try:
        controlButtons = driver.find_elements(By.CSS_SELECTOR, ".ctrlButtons .cp") 
        print(f'controlButtons: {controlButtons}')
        for button in controlButtons:
            buttonName = button.get_attribute("src").split("/")[-1].replace(".svg", "")
            print(f'buttonName: {buttonName}')
            if buttonName == 'iconGroup':
                button.click()
                time.sleep(2)
                groupTabs = driver.find_elements(By.CSS_SELECTOR, ".njRB") 
                print(f'groupTabs: {groupTabs}')
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
                                        print(Fore.GREEN + '-- Left Group Successfully--' + Style.RESET_ALL)
                                        write_to_terminal("-- Left Group Successfully--")
                                        time.sleep(30)
                        
    except Exception as e:
        print(f'Failed to Reset Dungeon: {e}')
    

def is_leader(driver):
    return bool(driver.find_elements(By.CSS_SELECTOR, ".cName.gLeader"))

def engage_if_leader(driver, whistle = False):
    if is_leader(driver):
        if whistle:
            send_keystrokes(driver, "T")
            return
        print('Try find engage as leader - no whistle')
        #write_to_terminal(f"Leader - Watching for Engage")
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
        spellAttack(driver,'R') # Add hotkey config
    else:
        attack_nearest_monster(driver)
    
def attack_nearest_monster(driver):
    global attack_counter
    attack_counter += 1
    #maxMonsters = 4
    print(f'Attack Counter: {attack_counter}')
    try:
        quickAttack(driver)
        monsters = get_monsters(driver)
        #if len(monsters) > maxMonsters:
        #    print("Too many monsters")
        #    resetDungeon(driver)
        #    print('Dungeon reset')
        #    return
            # Attempt to reduce the number of monsters or reset dungeon
            #actions = ActionChains(driver).key_down(Keys.SHIFT).key_up(Keys.SHIFT).perform()

        #print(f'Less than {maxMonsters} Monsters - Keep Fighting')
        # Remove modulo-based key presses
        if attack_counter % 8 == 0:
            send_keystrokes(driver, 'Q')
        if attack_counter % 17 == 0:
            actions = ActionChains(driver).key_down(Keys.CONTROL).key_up(Keys.CONTROL).perform()
        elif attack_counter % 19 == 0:
            actions = ActionChains(driver).key_down(Keys.ALT).key_up(Keys.ALT).perform()
        elif attack_counter % 21 == 0:
            actions = ActionChains(driver).key_down(Keys.SHIFT).key_up(Keys.SHIFT).perform()
        elif attack_counter % 13 == 0:
            pass
            #actions = ActionChains(driver).key_down('R').key_up('R').perform()
        elif attack_counter % 150 == 0:
            send_keystrokes(driver, 'A')
            time.sleep(.2)
            send_keystrokes(driver, 'A')
            time.sleep(.2)

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


def automate_fighting(driver, maxMonsters = 4, whistle = False):
    global fighting, fight_state, role
    #write_to_terminal(f"Fighting: {fighting}")
    #write_to_terminal(f"Fight State: {fight_state}")
    #update_overlay_position()
    
    while fighting and running:
        try:
            isLeader = is_leader(driver)
            print(f'Is Leader: {isLeader}')
            
            if is_in_town(driver):
                print("Automate Fighting Step 0.5: inTown - select_catacombs()")
                select_catacombs(driver)

            print("Automate Fighting Step 1: checkHealth()")
            checkHealth(driver) 

            print("Automate Fighting Step 2: checkForDungeonReset()")
            checkForDungeonReset(driver, maxMonsters)

            if not isLeader:
                print("Automate Fighting Step 3.1: not isLeader - wait_for_monsters()")
                wait_for_monsters()
            else:
                print("Automate Fighting Step 3.2: isLeader - engage_if_leader()")
                engage_if_leader(driver, whistle)

            x = 0
            while x < 6:
                print(f"Automate Fighting Step 4: fight_based_on_role({role})")
                fight_based_on_role(driver, role)
                x += 1

            print("Automate Fighting Step 5: checkForDrops()")
            checkForDrops(driver)

        except:
            print('In Automate Fighting - Fighting Exception')
            break

def checkForDrops(driver):
    try:
        print('Check Items')
        #write_to_terminal(f"Looking for items")
        drop_items = driver.find_elements(By.CSS_SELECTOR, ".dropItemsBox .itemBox")
        if drop_items:
            print(Fore.GREEN + 'Found Items' + Style.RESET_ALL)
            #write_to_terminal(f"Drops: {drop_items}")
            scanDroppedItems(driver, drop_items)
    except:
        print('checkForDrops threw exception')


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
            
            #write_to_terminal(f"-HP: {hp}")
            #write_to_terminal(f"-MP: {mp}")
            print(f"-HP: {hp}")
            print(f"-MP: {mp}")
            
            if hp < 40:
                print("Fight: To ~> Town Heal <~")
                write_to_terminal("Fight: To ~> Town Heal <~")
                town_heal(driver)
                spendStatPoints(driver, STAT_JSON_PATH)
                auto_stat_and_ability_allocation(driver, STAT_JSON_PATH)
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
        write_to_terminal(f"Invalid Input, Please enter an integer value.")
        return False

# Function to get and check the loot threshold value
def get_loot_threshold():
    global loot_threshold
    #loot_threshold = loot_textbox.get()
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
    global fighting, running, role, loot_threshold
    driver = setup_browser()

    print("Get Character Config")
    getCharacter(driver)
    role = CONFIG['role']
    whistle = CONFIG['whistle']
    loot_threshold = CONFIG['loot_threshold']

    update_character_json(driver)
    #get_loot_threshold()

    print('checkStats and abilities')
    spendStatPoints(driver, STAT_JSON_PATH)
    auto_stat_and_ability_allocation(driver, STAT_JSON_PATH)
    print('Done checkStats and abilities')

    #loot_threshold = loot_textbox.get() #Set loot threshold
    
    write_to_terminal("Fight!... ")
    automate_fighting(driver,4,whistle) #wolfie 4 is the max monster

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

def team_fight():
    print("Team Fight button pressed")

def stop_automation():
    global fighting, fishing, cooking, running
    fighting = False
    fishing = False
    cooking = False
    running = False
    write_to_terminal("Automation stopped by Stop button or hotkey.")

def heal_fish(driver):
    global fishing
    print('heal_fish() - Town Heal')
    fishing = True
    startFishing(driver, True)

def stop_fishing():
    global fishing
    fishing = False
    
    write_to_terminal("- Fishing stopped -")

# Function to handle config selection
def load_selected_configs():
    return
    main_config_name = main_config_var.get()
    auto_stat_config_name = auto_stat_config_var.get()
    
    if main_config_name in main_configs:
        global CONFIG  # Use global CONFIG if it's already defined in your existing code
        CONFIG = main_configs[main_config_name]
        print(f"Loaded main config: {main_config_name}")
    
    if auto_stat_config_name in auto_stat_configs:
        global STAT_JSON_PATH  # Use the STAT_JSON_PATH if already defined
        STAT_JSON_PATH = auto_stat_configs[auto_stat_config_name]
        print(f"Loaded auto stat config: {auto_stat_config_name}")

    print(f"Main Config: {CONFIG}")
    print(f"Auto Stat Config: {STAT_JSON_PATH}")
    
# Image : images/SlashHustler.png = 1312x736
# Image : images/SlashHustler.png = 1312x736
def show_loading_screen():
    # Create a separate window for loading
    loading_screen = tk.Toplevel()
    
    # Get the screen width and height
    screen_width = loading_screen.winfo_screenwidth()
    screen_height = loading_screen.winfo_screenheight()

    # Set your desired window width and height
    window_width = 1312
    window_height = 736

    # Calculate the position to center the window
    position_x = int((screen_width / 2) - (window_width / 2))
    position_y = int((screen_height / 2) - (window_height / 2))

    # Set the geometry with the calculated position
    loading_screen.geometry(f"{window_width}x{window_height}+{position_x}+{position_y}")
    
    loading_screen.configure(bg='#2E3B4E')  # Darker blue background for loading screen

    # Load and display the image
    banner_image = Image.open("images/SlashHustler.png")
    banner_photo = ImageTk.PhotoImage(banner_image)
    banner_label = tk.Label(loading_screen, image=banner_photo, bg='#2E3B4E')
    banner_label.pack()

    # After 3 seconds (3000 ms), close the loading screen
    loading_screen.after(2000, loading_screen.destroy)

    # Block the main window from appearing until the loading screen is closed
    overlay.wait_window(loading_screen)

def load_config():
    config_file = config_dropdown.get()
    if config_file:
        config_data = load_json(f"configs/{config_file}.json")
        # Update the fields with the loaded config data
        name_entry.delete(0, tk.END)
        name_entry.insert(0, config_data.get('name', ''))
        role_entry.delete(0, tk.END)
        role_entry.insert(0, config_data.get('role', ''))
        class_entry.delete(0, tk.END)
        class_entry.insert(0, config_data.get('class', ''))
        leader_var.set(config_data.get('leader', False))
        whistle_var.set(config_data.get('whistle', False))
        auto_stat_var.set(config_data.get('auto_stat', False))
        loot_entry.delete(0, tk.END)
        loot_entry.insert(0, str(config_data.get('loot_threshold', '14')))
        max_monsters_entry.set(str(config_data.get('max_monsters', '4')))
        fishing_level_entry.set(int(config_data.get('fishing_level', '1')))


def save_config():
    new_config_data = {
        "name": name_entry.get(),
        "role": role_entry.get(),
        "class": class_entry.get(),
        "leader": leader_var.get(),
        "whistle": whistle_var.get(),
        "loot_threshold": int(loot_entry.get()),
        "auto_stat": auto_stat_var.get(),
        "max_monsters": int(max_monsters_entry.get()),
        "fishing_level": int(fishing_level_entry.get()),

        # Empty inventory and equipment for now; you can later extend this to handle dynamic inventory input
        "inventory": {},
        "equipment": {}

    }

    config_name = new_config_data['name']
    save_json(f"configs/{config_name}.json", new_config_data)
    tk.messagebox.showinfo("Save Config", "Configuration saved successfully.")


# Refresh button to apply new config and restart threads
def refresh_threads():
    x = 0
    if fighting:
        x = 1
    elif fishing:
        x = 2
    elif cooking:
        x = 3

    stop_automation()
    load_config()

    if x == 1:
        fight()
    if x == 2:
        fish()
    if x == 3:
        cook()

#CONFIG GUI



# Set up the GUI
overlay = tk.Tk()
overlay.title("Slash Hustler")
overlay.geometry("470x425+1400+700")
overlay.configure(bg='#839351')  # Ladder Slasher color green BG
overlay.withdraw()

show_loading_screen()

style = ThemedStyle(overlay)
style.set_theme("default")  # Use 'clam' theme for a modern look
style.configure('TNotebook.Tab', padding=[10, 10], font=('Helvetica', '12', 'bold'))
style.configure('TButton', padding=6, font=('Helvetica', 14), relief='flat', borderwidth=0, focuscolor='none')
style.configure('TFrame', background='#2E3B4E')
style.configure('TLabel', background='#2E3B4E', foreground='white', font=('Verdana', 12))
style.configure('TCheckbutton', background='#2E3B4E', foreground='white', font=('Verdana', 12))

# Create a notebook (tabs)
notebook = ttk.Notebook(overlay)
notebook.grid(row=1, column=0, columnspan=2, sticky='nsew', padx=10, pady=10)

# Main Tab
main_frame = tk.Frame(notebook, bg='#2E3B4E')  # Dark blue for contrast
notebook.add(main_frame, text="Main")

tk.Label(main_frame, text="Slash Hustler", font=('Verdana', 40), bg='#2E3B4E', fg='white').grid(row=0, column=1, columnspan=3, padx=40,pady=10, sticky='nsew')

tk.Button(main_frame, text="Fight", command=fight, font=('Verdana', 24), bg='green', fg='white').grid(row=1, column=1, padx=25, pady=15, sticky='nsew')
tk.Button(main_frame, text="Stop", command=stop_automation, font=('Verdana', 24), bg='red', fg='black').grid(row=1, column=3, padx=25, pady=15, sticky='nsew')

tk.Label(main_frame, text="", font=('Verdana', 16), bg='#3A3A3A', fg='#FFFFFF').grid(row=2, column=1, padx=5, pady=10, sticky='nsew')

tk.Button(main_frame, text="Fish", command=fish, font=('Verdana', 24), bg='#4C8BF5', fg='white').grid(row=3, column=1, padx=25, pady=15, sticky='nsew')
tk.Button(main_frame, text="Cook", command=cook, font=('Verdana', 24), bg='#4C8BF5', fg='white').grid(row=3, column=3, padx=25, pady=15, sticky='nsew')

"""
# Fighting Tab
fighting_frame = tk.Frame(notebook, bg='#3A3A3A')  # Darker gray background
notebook.add(fighting_frame, text="Fighting")

tk.Label(fighting_frame, text="Fighting Settings", font=('Verdana', 16), bg='#3A3A3A', fg='#FFFFFF').grid(row=0, column=1, padx=5, pady=10, sticky='nsew')

roleFrame = tk.Frame(fighting_frame, bg='#5A5A5A')  # Slightly lighter for contrast
roleFrame.grid(row=1, column=1, padx=10, pady=5, sticky='nsew')

tk.Label(roleFrame, text="Role: ", font=('Verdana', 12), bg='#5A5A5A', fg='white').grid(row=0, column=0, padx=5, pady=5)
role_dropdown = ttk.Combobox(roleFrame, values=["Tank", "DPS", "Mage", "Healer", "TankHeal", "NoHit"])
role_dropdown.grid(row=0, column=1, padx=5, pady=5, sticky='nsew')

lootFrame = tk.Frame(fighting_frame, bg='#5A5A5A')
lootFrame.grid(row=2, column=1, padx=10, pady=5, sticky='nsew')

tk.Label(lootFrame, text="Loot Threshold: ", font=('Verdana', 12), bg='#5A5A5A', fg='white').grid(row=0, column=0, padx=5, pady=5)
loot_entry = ttk.Combobox(lootFrame, values=[str(i) for i in range(0, 50)], width=5)
loot_entry.grid(row=0, column=1, padx=5, pady=5, sticky='nsew')

monsterFrame = tk.Frame(fighting_frame, bg='#5A5A5A')
monsterFrame.grid(row=3, column=1, padx=10, pady=5, sticky='nsew')

tk.Label(monsterFrame, text="Max Monsters: ", font=('Verdana', 12), bg='#5A5A5A', fg='white').grid(row=0, column=0, padx=5, pady=5)
max_monsters_dropdown = ttk.Combobox(monsterFrame, values=[str(i) for i in range(2, 11)], width=5)
max_monsters_dropdown.grid(row=0, column=1, padx=5, pady=5, sticky='nsew')

tk.Checkbutton(fighting_frame, text="Leader", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=4, column=1, padx=5, pady=5, sticky='nsew')
tk.Checkbutton(fighting_frame, text="Whistle", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=5, column=1, padx=5, pady=5, sticky='nsew')

tk.Checkbutton(fighting_frame, text="Fish while healing", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=6, column=1, padx=5, pady=5, sticky='nsew')
tk.Checkbutton(fighting_frame, text="Eat fish in between fights", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=7, column=1, padx=5, pady=5, sticky='nsew')

tk.Button(fighting_frame, text="Save", font=('Verdana', 10), bg='#4C8BF5', fg='white', width='5').grid(row=8, column=1, padx=5, pady=5, sticky='nsew')


# MasterQuest Tab
masterquest_frame = tk.Frame(notebook, bg='#2E3B4E')
notebook.add(masterquest_frame, text="MasterQuest")

tk.Checkbutton(masterquest_frame, text="Attempt MasterQuest", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=0, column=0, padx=5, pady=5)

tk.Label(masterquest_frame, text="Key Pattern", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=1, column=0, padx=5, pady=5)
key_pattern_1 = ttk.Combobox(masterquest_frame, values=["Random", "1st Gold", "2nd Silver", "3rd Bronze"])
key_pattern_1.grid(row=1, column=1, padx=5, pady=5)

tk.Checkbutton(masterquest_frame, text="Class Progression", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=3, column=0, padx=5, pady=5)


# Leveling Tab
leveling_frame = tk.Frame(notebook, bg='#3A3A3A')
notebook.add(leveling_frame, text="Leveling")

tk.Label(leveling_frame, text="Skill Allocation", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=0, column=0, padx=5, pady=5)
tk.Label(leveling_frame, text="Stat Allocation", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=1, column=0, padx=5, pady=5)

"""
# Proficiencies Tab
proficiencies_frame = tk.Frame(notebook, bg='#2E3B4E')
notebook.add(proficiencies_frame, text="Proficiencies")

tk.Label(proficiencies_frame, text="Fishing Level", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=1, column=0, padx=5, pady=5)
#   fishing_level_dropdown = ttk.Combobox(proficiencies_frame, values=["Auto", "1", "25"])
fishing_level_entry = ttk.Combobox(proficiencies_frame, values=[str(i) for i in range(1, 30)], width=3)
fishing_level_entry.grid(row=2, column=0, padx=5, pady=5)

tk.Checkbutton(proficiencies_frame, text="Fill Hot Key Bar with Fish", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=3, column=0, padx=5, pady=5)

fish_radio_var = tk.IntVar()
tk.Radiobutton(proficiencies_frame, text="Trash all fish", variable=fish_radio_var, value=1, font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=4, column=0, padx=5, pady=5)
tk.Radiobutton(proficiencies_frame, text="Keep one stack", variable=fish_radio_var, value=2, font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=5, column=0, padx=5, pady=5)
tk.Radiobutton(proficiencies_frame, text="Cook all fish", variable=fish_radio_var, value=3, font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=6, column=0, padx=5, pady=5)

"""
# Marketplace Tab
marketplace_frame = tk.Frame(notebook, bg='#3A3A3A')
notebook.add(marketplace_frame, text="Marketplace")

tk.Checkbutton(marketplace_frame, text="Check Marketplace", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=0, column=0, padx=5, pady=5)


# Vault Tab
vault_frame = tk.Frame(notebook, bg='#2E3B4E')
notebook.add(vault_frame, text="Vault")

tk.Checkbutton(vault_frame, text="Auto Vault", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=0, column=0, padx=5, pady=5)
tk.Checkbutton(vault_frame, text="Auto Gear", font=('Verdana', 12), bg='#3A3A3A', fg='black').grid(row=1, column=0, padx=5, pady=5)

"""

# CONFIG Tab
config_frame = tk.Frame(notebook, bg='#3A3A3A')
notebook.add(config_frame, text="Config")

tk.Label(config_frame, text="Select Character", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=0, column=0, padx=5, pady=5)
config_dropdown = ttk.Combobox(config_frame, values=get_config_files())  # This function lists all config files
config_dropdown.grid(row=0, column=1, padx=5, pady=5)

tk.Label(config_frame, text="Character Name:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=1, column=0, padx=5, pady=5)
name_entry = tk.Entry(config_frame, bg='#2E3B4E', fg='white')
name_entry.grid(row=1, column=1, padx=5, pady=5)

tk.Label(config_frame, text="Role:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=2, column=0, padx=5, pady=5)
role_entry = tk.Entry(config_frame, bg='#2E3B4E', fg='white')
role_entry.grid(row=2, column=1, padx=5, pady=5)

tk.Label(config_frame, text="Class:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=3, column=0, padx=5, pady=5)
class_entry = tk.Entry(config_frame, bg='#2E3B4E', fg='white')
class_entry.grid(row=3, column=1, padx=5, pady=5)

# Add Hotkey handling for Which charm you want to be used for healing or mage attacks

tk.Label(config_frame, text="Loot Threshold:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=4, column=0, padx=5, pady=5)
loot_entry = tk.Entry(config_frame, bg='#2E3B4E', fg='white')
loot_entry.grid(row=4, column=1, padx=5, pady=5)

leader_var = tk.IntVar()
tk.Label(config_frame, text="Leader:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=5, column=0, padx=5, pady=5)
leader_check = tk.Checkbutton(config_frame, variable=leader_var, bg='#3A3A3A', fg='black')
leader_check.grid(row=5, column=1, padx=5, pady=5)

whistle_var = tk.IntVar()
tk.Label(config_frame, text="Whistle:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=7, column=0, padx=5, pady=5)
whistle_check = tk.Checkbutton(config_frame, variable=whistle_var, bg='#3A3A3A')
whistle_check.grid(row=7, column=1, padx=5, pady=5)

auto_stat_var = tk.IntVar()
tk.Label(config_frame, text="Auto Stat:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=8, column=0, padx=5, pady=5)
auto_stat_check = tk.Checkbutton(config_frame, variable=auto_stat_var, bg='#3A3A3A')
auto_stat_check.grid(row=8, column=1, padx=5, pady=5)

tk.Label(config_frame, text="Max Monsters:", font=('Verdana', 12), bg='#3A3A3A', fg='white').grid(row=9, column=0, padx=5, pady=5)
max_monsters_entry = ttk.Combobox(config_frame, values=[str(i) for i in range(1, 11)], width=3)
max_monsters_entry.grid(row=9, column=1, padx=5, pady=5)

tk.Button(config_frame, text="Load Config", command=load_config, bg='#4C8BF5', fg='white').grid(row=10, column=0, padx=5, pady=5)
tk.Button(config_frame, text="Save Config", command=save_config, bg='#4C8BF5', fg='white').grid(row=10, column=1, padx=5, pady=5)
tk.Button(config_frame, text="Refresh", command=refresh_threads, bg='#4C8BF5', fg='white').grid(row=10, column=0, columnspan=2, padx=5, pady=10)



# Show main window after loading screen
overlay.deiconify()

# Start the GUI loop
overlay.mainloop()
