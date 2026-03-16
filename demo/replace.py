import os
import glob
import re

directory = '/home/lidetu/demo-door-nuvo/demo'
html_files = glob.glob(os.path.join(directory, '*.html'))

for filepath in html_files:
    with open(filepath, 'r') as file:
        content = file.read()

    # Replace "N U V O" with "N O V A &nbsp; S Y S T E M S"
    content = content.replace("N U V O", "N O V A &nbsp; S Y S T E M S")
    
    # Replace "NUVO" with "NOVA SYSTEMS"
    content = content.replace("NUVO", "NOVA SYSTEMS")
    
    # Replace `<title>NUVO</title>` just in case
    # Let's also check for "nuvo-header" - wait, if I replace "NUVO" with "NOVA SYSTEMS", it will also replace class names like "nuvo-header"!
    # Let's NOT replace lowercase "nuvo" unless it is in text. 
    # Python `.replace("NUVO", "NOVA SYSTEMS")` is case-sensitive, so "nuvo" won't be matched!
    
    with open(filepath, 'w') as file:
        file.write(content)
print("Replacement complete.")
