from bot.base import *

def write_to_terminal(terminal, message):
    terminal.insert(tk.END, message + '\n')
    terminal.see(tk.END)