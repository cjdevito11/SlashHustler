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

CHARACTER_JSON_PATH = 'configs/MrHustle.json'  # Update this to get character name

CONFIG = {
    "name": "CharacterName",
    "class": "dps",
    "leader": False,
    "whistle": False,
    "inventory": [],
    "equipment": {
        "weapon": {},
        "armor": {},
        "charms": [],
        "glyphs": []
    }
}

# Load the scoring system from JSON
def load_scoring_system():
    with open('jsons/itemScore.json', 'r') as file:
        return json.load(file)
scoring_system = load_scoring_system()

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
    global CHARACTER_JSON_PATH, CONFIG
    characterName = driver.find_element(By.CSS_SELECTOR, ".cName").text
    print(f'characterName: {characterName}')
    charJsonPath = 'configs/' + characterName
    charJsonPath = charJsonPath + '.json'
    print(f'charJsonPath: {charJsonPath}')
    CHARACTER_JSON_PATH = charJsonPath
    CONFIG = loadConfig()
    return

# Load character data from JSON
def loadConfig():
    if os.path.exists(CHARACTER_JSON_PATH):
        with open(CHARACTER_JSON_PATH, 'r') as file:
            return json.load(file)
    else:
        return CONFIG

def saveConfig():
    with open(CHARACTER_JSON_PATH, 'w') as file:
        json.dump(CONFIG, file, indent=4)

def update_character_json(driver):
    global CONFIG
    CONFIG["inventory"] = scan_inventory(driver)
    CONFIG["equipment"] = scan_equipment(driver)
    
    saveConfig()

def scan_inventory(driver):
    inventory_items = driver.find_elements(By.CSS_SELECTOR, ".invEqBox .itemBox")
    inventory = []
    
    for item in inventory_items:
        hover_and_print_item_details(driver, item)
        time.sleep(0.5)  # Allow time for the hover popup to appear
        item_details = driver.find_element(By.CSS_SELECTOR, ".tipBox.tbItemDesc").get_attribute('outerHTML')
        parsed_item = parse_gear_details(item_details)
        print(f"parsed_item: {parsed_item}")
        inventory.append(parsed_item)
        #inventory.append(parse_item_details(item_details))
    
    return inventory

def scan_equipment(driver):
    equipped_items = driver.find_elements(By.CSS_SELECTOR, ".invEquipped .itemBox")
    equipment = {
        "weapon": {},
        "armor": {},
        "charms": [],
        "glyphs": []
    }
    
    for item in equipped_items:
        slot = item.get_attribute("data-slot")
        hover_and_print_item_details(driver, item)
        time.sleep(0.3)  # Allow time for the hover popup to appear
        item_details = driver.find_element(By.CSS_SELECTOR, ".tipBox.tbItemDesc").get_attribute('outerHTML')
        #parsed_item = parse_item_details(item_details)
        parsed_item = parse_gear_details(item_details)
        print(f"parsed_item: {parsed_item}")
        if slot == "weapon":
            equipment["weapon"] = parsed_item
        elif slot == "armor":
            equipment["armor"] = parsed_item
      #  elif "charm" in slot:
      #      equipment["charms"].append(parsed_item)
      #  elif "glyph" in slot:
      #      equipment["glyphs"].append(parsed_item)
    
    return equipment

def parse_item_details(item_html):
    # Implement your logic to parse item details from the HTML
    # Return a dictionary with item details
    return {"html": item_html}  # Placeholder, replace with actual parsing logic

def parse_gear_details(html):
    soup = BeautifulSoup(html, 'html.parser')
    item_details = {}

    item_name = soup.find('div', class_='fcb fwb').text.strip()
    item_details['name'] = item_name

    stats = soup.find_all('div', class_='fcb')
    for stat in stats:
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
        else:
            # General attribute handling
            parts = text.split(' ')
            if len(parts) > 1:
                stat_name = ' '.join(parts[:-1])
                stat_value = parts[-1]
                item_details[stat_name.lower().replace(' ', '_')] = stat_value

    return item_details
    
def hover_and_print_item_details(driver, item_element):
    try:
        # Move to the item to trigger the hover effect
        actions = ActionChains(driver)
        actions.move_to_element(item_element).perform()

        # Pause for a moment to allow the popup to appear
        time.sleep(0.5)

        # Locate the popup div that appears when hovering
        popup = driver.find_element(By.CSS_SELECTOR, ".tipBox.tbItemDesc")

        # Print the popup's HTML content
        print(popup.get_attribute('outerHTML'))

    except Exception as e:
        write_to_terminal(f"Error while hovering and printing item details: {e}")

# Function to add an item to the inventory
def add_item_to_inventory(driver, item):
    CONFIG["inventory"].append(parse_item_details(item.get_attribute('outerHTML')))
    saveConfig()

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
        return {
            "current_health": current_health,
            "max_health": max_health,
            "current_mana": current_mana,
            "max_mana": max_mana
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
            time.sleep(15)  # Adjust healing time as needed
            health_mana_data = get_health_mana(driver)
            if health_mana_data:
                current_health = health_mana_data['current_health']
                max_health = health_mana_data['max_health']
                current_mana = health_mana_data['current_mana']
                max_mana = health_mana_data['max_mana']
                hp = (current_health / max_health) * 100
                mp = (current_mana / max_mana) * 100
                
                write_to_terminal(f"~Town Stats~")
                write_to_terminal(f"-HP: {hp}")
                write_to_terminal(f"-MP: {mp}")
                print(f"~Town Stats~")
                print(f"~HP: {hp}")
                print(f"-MP: {mp}")
                
                if hp < 100:
                    print("~~ Loop TownHeal ~~")
                    town_heal(driver)
                    return
        
    except Exception as e:
        write_to_terminal(f"Error going to town: {e}")

def fight_heal(driver,hp,mp):
    if hp < 50:
        if mp > 20: 
            send_keystrokes(driver,"R")
            time.sleep(5)
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

# Function to loot an item
def loot_item(driver, item):
    try:
        write_to_terminal(f"Looting item: {item['name']} with score: {item['score']}")
        item["element"].click()
        add_item_to_inventory(driver, item)
    except Exception as e:
        write_to_terminal(f"Error looting item: {e}")
        
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
                                        time.sleep(120)
                        
        #Create Group
        #Leave Group
        
    finally:
        return
    
# Function to parse item drops and calculate their scores
def parse_and_score_drops(driver, drop_items):
    try:
        scored_items = []

        for item in drop_items:
            item_name_element = item.find_element(By.CSS_SELECTOR, "img")
            item_modifiers = item.find_elements(By.CSS_SELECTOR, ".ds2")
            
            hover_and_print_all_item_details(driver)
            
            item_name = item_name_element.get_attribute("src").split("/")[-1].replace(".svg", "")
            iLvl = [mod.text for mod in item_modifiers]
            
            item_score = calculate_item_score(item_name, iLvl)

            write_to_terminal(f"Item: {item_name}, Score: {item_score}")
            write_to_terminal(f"iLvl: {iLvl}")
            print(f"Item: {item_name}, Score: {item_score}")
            print(f"iLvl: {iLvl}")
            scored_items.append({
                "element": item,
                "name": item_name,
                "iLvl": iLvl,
                "score": item_score
            })

            if item_score > loot_threshold:
                loot_item(driver, item)

        return scored_items
    except Exception as e:
        write_to_terminal(f"Error parsing and scoring drops: {e}")
        return []

# Function to calculate the score of an item based on its name and modifiers
def calculate_item_score(item_name, modifiers):
    score = 0
    if item_name in scoring_system:
        score += scoring_system[item_name]["base_score"]
        for mod in modifiers:
            print(f"Mod: {mod}")
            if mod in scoring_system[item_name]["modifiers"]:
                score += scoring_system[item_name]["modifiers"][mod]
    return score

# Function to automate fighting
def automate_fighting(driver):
    global fighting, fight_state
    write_to_terminal(f"Fighting: {fighting}")
    if fighting:
        if is_in_town(driver):
            select_catacombs(driver)

        health_mana_data = get_health_mana(driver)
        if health_mana_data:
            current_health = health_mana_data['current_health']
            max_health = health_mana_data['max_health']
            current_mana = health_mana_data['current_mana']
            max_mana = health_mana_data['max_mana']
            
            hp = (current_health / max_health) * 100
            mp = (current_mana / max_mana) * 100
            write_to_terminal(f"-HP: {hp}")
            print(f"-HP: {hp}")
            write_to_terminal(f"-MP: {mp}")
            print(f"-MP: {mp}")
            
            if hp < 40:
                print("Fight: ~> Town Heal <~")
                town_heal(driver)
            if hp < 60:
                fight_heal(driver, hp, mp)
            if hp > 60 or mp < 30:
                attack_switch(driver, hp, mp)
        
        drop_items = driver.find_elements(By.CSS_SELECTOR, ".dropItemsBox .itemBox")
        if drop_items:
            parse_and_score_drops(driver, drop_items)
            
        monsters = get_monsters(driver)
        if len(monsters) > 4:
            resetDungeon(driver)
        if not monsters:
            if is_engage_button_visible(driver):
                engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
                if whistle_var.get():
                    send_keystrokes(driver, "T")  # Assume T is the hotkey for whistle
                    write_to_terminal("Whistled.")
                if engage_button:
                    engage_button.click()
                    write_to_terminal("Clicked engage button.")
            else:
                send_keystrokes(driver, "T")
                
        for monster in monsters:
            if monster["health_percentage"] > 0:
                attack_monster(driver, monster)
                break

        # Schedule next fight action
        overlay.after(1000, lambda: automate_fighting(driver))  # Adjust delay as needed

# Function to start fighting
def fight():
    global fighting
    
    driver = setup_browser()
    fighting = True
    print("Get Character Config")
    getCharacter(driver)
    
    # Scan inventory and equipment at the start
    #update_character_json(driver)
    
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
overlay.geometry("500x600+1450+530")
#overlay.attributes('-topmost', True)
overlay.attributes('-alpha', 0.7)
overlay.overrideredirect(True)

fight_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Fight", command=fight)
fight_button.pack()

stop_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Stop", command=stop_automation)
stop_button.pack()

whistle_var = tk.BooleanVar(value=False)  # Set initial value to False
whistle_checkbox = tk.Checkbutton(overlay, text="Whistle", variable=whistle_var, bg='black', fg='white', font=('exocet', 9))
whistle_checkbox.pack()

terminal_output = tk.Text(overlay, bg='black', fg='white', font=('exocet', 9), wrap='word')
terminal_output.pack(expand=True, fill='both')

#sys.stdout = StdoutRedirector(terminal_output)

#keyboard.add_hotkey('space', stop_automation)

overlay.mainloop()
