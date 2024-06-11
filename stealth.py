import json
import os
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

# Add the jsons directory to the system path
sys.path.append(os.path.join(os.path.dirname(__file__), 'jsons'))

# Now import game_data from the jsons directory
from gameData import data

def setup_browser():
    # Set up options for the existing browser session
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "localhost:9222")
    
    # Set up the WebDriver with the correct path to chromedriver
    driver = webdriver.Chrome(options=chrome_options, service=Service(r"C:\chromedriver-win64\chromedriver.exe"))

    return driver

def get_health_mana(driver):
    try:
        # Wait for the elements to be present
        wait = WebDriverWait(driver, 10)

        # Find health and mana elements
        health_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".lifeMeter .meterBoxLabel")))
        mana_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".manaMeter .meterBoxLabel")))
        
        # Parse the health and mana values
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
        print(f"Error: {e}")
        return None

def get_item_details(driver, item_slot):
    try:
        actions = ActionChains(driver)
        actions.move_to_element(item_slot).perform()
        # Wait for the tooltip to appear
        time.sleep(.5)
        item_info = driver.find_element(By.CSS_SELECTOR, ".tipBox.tbItemDesc").get_attribute("innerHTML")
        return item_info
    except Exception as e:
        print(f"Error getting item details: {e}")
        return None

def parse_item_info(item_info):
    parsed_info = {}
    for stat in data["Equipment"]:
        if stat in item_info:
            parsed_info[stat] = data["Equipment"][stat]
    return parsed_info

def get_inventory_items(driver):
    try:
        wait = WebDriverWait(driver, 10)
        actions = ActionChains(driver)

        # Hover over the inventory tab to reveal items
        inventory_tab = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".invTabs .njRB.sel")))
        actions.move_to_element(inventory_tab).perform()

        # Wait for the inventory items to be visible
        time.sleep(2)  # Adjust as necessary to allow items to load

        # Find all item slots in the inventory
        item_slots = driver.find_elements(By.CSS_SELECTOR, ".invItemsBox .itemSlotBox")

        inventory_items = []

        for slot in item_slots:
            try:
                item = slot.find_element(By.CSS_SELECTOR, ".itemBox")
                item_info = get_item_details(driver, item)
                if item_info:
                    parsed_info = parse_item_info(item_info)
                    inventory_items.append(parsed_info)
            except Exception as e:
                # If there's no item in the slot, continue to the next one
                print(f"Error getting item in slot: {e}")
                continue

        return inventory_items
    except Exception as e:
        print(f"Error: {e}")
        return []

def get_equipment_items(driver):
    try:
        wait = WebDriverWait(driver, 10)
        actions = ActionChains(driver)

        # Hover over the Equipment tab to reveal equipment items
        equipment_tab = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".invTabs .njRB:nth-child(2)")))
        actions.move_to_element(equipment_tab).perform()
        # Wait for the equipment items to be visible
        time.sleep(2)  # Adjust as necessary to allow items to load

        # Find all item slots in the equipment
        item_slots = driver.find_elements(By.CSS_SELECTOR, ".invEqBox .itemSlotBox")

        equipment_items = []

        for slot in item_slots:
            try:
                item = slot.find_element(By.CSS_SELECTOR, ".itemBox")
                item_info = get_item_details(driver, item)
                if item_info:
                    parsed_info = parse_item_info(item_info)
                    equipment_items.append(parsed_info)
            except Exception as e:
                print(f"Error getting item in slot: {e}")
                continue

        return equipment_items
    except Exception as e:
        print(f"Error: {e}")
        return []

def save_inventory_data(inventory_data):
    with open('inventory_data.json', 'w') as json_file:
        json.dump(inventory_data, json_file, indent=4)

def main():
    # Set up the browser
    driver = setup_browser()
    
    # Get health and mana data
    health_mana_data = get_health_mana(driver)
    
    if health_mana_data:
        print(f"Current Health: {health_mana_data['current_health']} / {health_mana_data['max_health']}")
        print(f"Current Mana: {health_mana_data['current_mana']} / {health_mana_data['max_mana']}")

        # Logic to determine if healing is needed
        if health_mana_data['current_health'] < health_mana_data['max_health'] * 0.3:
            print("Health is below 30%, healing is needed.")
            # You can add code here to perform healing
    else:
        print("Failed to retrieve health and mana data.")
    
    # Get inventory items
    inventory_items = get_inventory_items(driver)
    
    if inventory_items:
        print("Inventory Items:")
        for item in inventory_items:
            print(item)
    else:
        print("Failed to retrieve inventory items.")
    
    # Get equipment items
    equipment_items = get_equipment_items(driver)
    
    if equipment_items:
        print("Equipment Items:")
        for item in equipment_items:
            print(item)
    else:
        print("Failed to retrieve equipment items.")
    
    # Save inventory data
    inventory_data = {
        "health_mana": health_mana_data,
        "inventory_items": inventory_items,
        "equipment_items": equipment_items
    }
    save_inventory_data(inventory_data)
    
    # Close the browser connection if you don't need it anymore
    # driver.quit()

if __name__ == "__main__":
    main()
