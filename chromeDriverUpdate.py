import subprocess
import requests
from bs4 import BeautifulSoup
import os
import zipfile
import shutil
import tkinter as tk
from tkinter import messagebox
import time

def get_current_chromedriver_version():
    try:
        result = subprocess.run(["chromedriver", "--version"], capture_output=True, text=True)
        version = result.stdout.split()[1]
        return version, None  # Return version and no error
    except Exception as e:
        return None, str(e)  # Return no version and the error message


def get_latest_version_info():
    url = 'https://googlechromelabs.github.io/chrome-for-testing/#stable'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Get the latest stable Chrome version from the <code> tag
    stable_section = soup.find('section', id='stable')
    latest_version = stable_section.find('p').find('code').text
    
    # Find the row for chromedriver win64
    table_rows = soup.find_all('tr', class_='status-ok')

    for row in table_rows:
        # Check if this row corresponds to chromedriver win64
        columns = row.find_all('th')
        cells = row.find_all('td')
        
        if 'chromedriver-win64.zip' in cells[2].text:
            download_url = cells[2].find('code').text
            print(f'Download_url: {download_url}')
            
       # if columns and 'chromedriver' in columns[0].text and 'win64' in columns[1].text:
       ##     # Extract the correct URL from the appropriate <td> element
       #     if len(cells) >= 1:
       #         download_url = cells[0].find('code').text.strip()  # Fix: extracting only the URL text
        
            return latest_version, download_url

    return None, None  # Return None if no matching version found

def download_and_extract_chromedriver(download_url, dest_folder):
    zip_path = os.path.join(dest_folder, 'chromedriver-win64.zip')

    try:
        # Step 1: Download the zip file
        print(f"Downloading ChromeDriver from {download_url}...")
        response = requests.get(download_url, stream=True)

        # Check if the response is OK (status code 200)
        if response.status_code == 200:
            # Save the zip file
            with open(zip_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=128):  # Download in chunks
                    file.write(chunk)
            print(f"Downloaded successfully to {zip_path}")
        else:
            print(f"Failed to download ChromeDriver. Status code: {response.status_code}")
            return None
        
        time.sleep(2)
        
        # Step 2: Extract the zip file
        print("Extracting ChromeDriver...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(dest_folder)
        print(f"Extracted {zip_path} as {zip_ref} to {dest_folder}")

        # Return the path of the ChromeDriver executable
        return os.path.join(dest_folder, 'chromedriver-win64/chromedriver.exe')

    except zipfile.BadZipFile:
        print("Error: The downloaded file is not a valid zip file.")
        return None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Step 4: Replace the old ChromeDriver in System32
def replace_chromedriver(new_driver_path, system32_path):
    try:
        print('Replace Chrome Driver')
        print(f'new_driver_path: {new_driver_path}')
        print(f'system32_path: {system32_path}')
        
        dest_path = os.path.join(system32_path, 'chromedriver.exe')
        print(f'dest_path: {dest_path}')
        
        shutil.copyfile(new_driver_path, dest_path)
        return True
    except Exception as e:
        return False, str(e)

# Create the GUI
def create_gui():
    window = tk.Tk()
    window.title("ChromeDriver Updater")
    window.geometry('500x400')
    
    text_area = tk.Text(window, wrap='word', height=20)
    text_area.pack(expand=True, fill='both')

    def update_status(message):
        text_area.insert(tk.END, message + "\n")
        text_area.see(tk.END)

    def prompt_user_to_continue(prompt_message):
        return messagebox.askyesno("Permission Request", prompt_message)

    def run_update_process():
        system32_path = r'C:\Windows\System32'
        
        # Step 1: Get the current ChromeDriver version
        update_status("Checking current ChromeDriver version...")
        current_version, error = get_current_chromedriver_version()
        if current_version:
            update_status(f"Current ChromeDriver Version: {current_version}")
        else:
            update_status(f"Error fetching ChromeDriver version: {error}")
            return
        
        if not prompt_user_to_continue("Do you want to check for updates?"):
            update_status("Process stopped by user.")
            return

        # Step 2: Check the latest ChromeDriver version
        update_status("Checking for the latest ChromeDriver version...")
        latest_version, download_url = get_latest_version_info()

        if latest_version:
            update_status(f"Latest ChromeDriver Version: {latest_version}")
        else:
            update_status("Error fetching latest ChromeDriver version.")
            return
        
        if current_version == latest_version:
            update_status("ChromeDriver is already up to date.")
            return

        if not prompt_user_to_continue(f"New version {latest_version} available. Do you want to download and install?"):
            update_status("Update process stopped by user.")
            return

        # Step 3: Download and extract the new ChromeDriver
        update_status("Downloading and extracting new ChromeDriver...")
        new_driver_path = download_and_extract_chromedriver(download_url, system32_path)
        update_status("ChromeDriver downloaded and extracted.")

        if not prompt_user_to_continue("Do you want to replace the current ChromeDriver with the new one?"):
            update_status("Process stopped before replacing ChromeDriver.")
            return

        # Step 4: Replace the old driver
        update_status("Replacing the old ChromeDriver...")
        success, error_message = replace_chromedriver(new_driver_path, system32_path)
        
        if success:
            update_status("ChromeDriver successfully updated!")
        else:
            update_status(f"Failed to replace ChromeDriver: {error_message}")

        update_status("Process completed.")

    # Add a button to start the update process
    start_button = tk.Button(window, text="Start Update Process", command=run_update_process)
    start_button.pack(pady=10)
    
    window.mainloop()

# Run the GUI
if __name__ == '__main__':
    create_gui()
