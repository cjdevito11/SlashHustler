from bot.base import *
#from selenium.webdriver.common.by import By

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
    
# Function to check if in town
def is_in_town(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                print(f"In Town")
                return True
        return False
    except Exception:
        return False