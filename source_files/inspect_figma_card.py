import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's search for "Figma" and print its element hierarchy
    idx = content.find('data-framer-name="Figma"')
    if idx != -1:
        print("--- Figma Card Markup ---")
        print(content[idx: idx + 2000])
        print("="*60)
        
if __name__ == '__main__':
    main()
