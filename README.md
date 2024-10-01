
Project: Character Config Script

Welcome to the Character Config Script! This project allows you to create and manage character configurations for your game. It’s designed to be simple enough for anyone to set up and use, even if you’re new to computers or programming.

Table of Contents
- Getting Started
- Prerequisites
- Installation
- Creating Your Character Config
- Running the Script
- Terminal Commands
- Contributing
- FAQ

Getting Started

This guide will walk you through how to:
- Install Python on your computer
- Install the required dependencies for the script
- Create your own character configuration
- Run the script from the terminal

Prerequisites

Before you start, you'll need:
- Python (a programming language we’ll use for this project)
- A Terminal or Command Prompt (don't worry, we’ll explain how to open this)

What is Python?

Python is a programming language that will run the code in this project. Don't worry, you don’t need to learn how to code to get this script running.

How to Install Python

1. Go to https://python.org/downloads and download the latest version of Python.
2. When you run the installer, make sure to check the box that says "Add Python to PATH" (this is important).
3. Follow the instructions to complete the installation.

You can check if Python is installed correctly by opening your Terminal (see below for instructions) and typing:

python --version

If Python is installed, you’ll see the version number.

Installation

Once Python is installed, follow these steps:

1. Download the Project Files: Get the project files from this repository or download them as a ZIP and extract them to a folder on your computer.
2. Open Terminal/Command Prompt:
   - On Windows: Press Windows + R, type cmd, and press Enter.
   - On Mac: Press Cmd + Space, type Terminal, and press Enter.
   - On Linux: Open your terminal from your applications menu.
   
3. Navigate to Your Project Folder:
   - In the terminal, type cd followed by the path to your project folder. For example:
     cd C:\path\to\your\project
     Replace C:\path\to\your\project with the actual path where you saved your project.

4. Install Dependencies:
   - The project requires some additional Python packages to work. You can install them by running this command in the terminal:
     pip install -r requirements.txt

Creating Your Character Config

To create your own character configuration:

1. Open the file called MrHustle.json in a text editor (e.g., Notepad on Windows or TextEdit on Mac).
2. Change the details to match your character:
   - name: The name of your character.
   - role: The role (like tank, healer, etc.).
   - class: The class of your character (e.g., Paladin, Mage).
   - loot_threshold: The threshold at which the character automatically picks up loot.

Here’s an example of what it might look like:

{
    "name": "MyCharacter",
    "role": "healer",
    "class": "Cleric",
    "leader": false,
    "whistle": false,
    "loot_threshold": 10,
    "auto_stat": true,
    "max_monsters": 5,
    "inventory": {...}
}

3. Save the file with your changes.

Running the Script

Once you’ve set everything up, it’s time to run the script.

1. Open the Terminal (or Command Prompt if you're on Windows).
2. Navigate to the folder where you saved your project using the cd command (as shown earlier).
3. Run the script by typing:
   python core.py
4. The script should start running and display outputs related to your character configuration.

Terminal Commands

Here’s a list of terminal commands you may need:

- Navigating to a Folder: 
  cd /path/to/folder

- Checking Python Version:
  python --version

- Running the Script:
  python core.py

- Installing Dependencies:
  pip install -r requirements.txt


Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.
z
FAQ

Q: What do I do if I see "Python is not recognized"?
A: This means Python wasn’t installed correctly or isn’t added to your system’s PATH. Try reinstalling Python and make sure to check the box that says "Add Python to PATH" during installation.

Q: How do I edit the character config file?
A: You can open .json files with any text editor (Notepad, TextEdit, etc.). Just make sure to save the file with the same name and format.

I hope this helps you get started! If you have any questions or need further assistance, feel free to ask.
