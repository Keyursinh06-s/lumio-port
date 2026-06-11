import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = content.find("Emily Carter")
    if idx != -1:
        print(f"Found Emily Carter at index {idx}")
        print("\n--- TESTIMONIALS SECTION CONTEXT ---")
        print(content[max(0, idx - 1500): idx])
        print("="*60)
        
if __name__ == '__main__':
    main()
