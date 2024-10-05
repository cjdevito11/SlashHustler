from bot.base import *

def send_keystrokes(driver, keys):
    try:
        # Find an element to send keystrokes to (e.g., the body or a specific element)
        body = driver.find_element(By.TAG_NAME, "body")
        actions = ActionChains(driver)
        actions.move_to_element(body)
        
        # Send the specified keys
        actions.send_keys(keys).perform()
        
        print(f"Sent keystrokes: {keys}")
    except Exception as e:
        print(f"Error sending keystrokes: {e}")