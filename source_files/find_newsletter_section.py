import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # We find the pricing sections and look ahead to find the newsletter section
    # Let's search for the marquee SVGs first. They are:
    # svg12600469402, svg12172246408, svg9365522886, etc.
    # Let's find where these SVGs are used in <use href="...">
    idx = content.find("#svg12600469402")
    if idx != -1:
        print(f"Found '#svg12600469402' at index {idx}")
        # Print 2000 characters before and after to get the context of the marquee
        print("\n--- MARQUEE CONTEXT ---")
        print(content[max(0, idx - 1500): min(len(content), idx + 1500)])
        print("="*60)
        
if __name__ == '__main__':
    main()
