import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = content.find("Designing intuitive with seamless")
    if idx != -1:
        print(f"Found toolkit text at index {idx}")
        print("\n--- TOOLKIT CARD CONTEXT ---")
        # Print 3000 chars before
        print(content[max(0, idx - 3000): idx])
        print("="*60)

if __name__ == '__main__':
    main()
