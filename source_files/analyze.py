import re

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    # Let's search for occurrences of '$' followed by digits
    matches = re.finditer(r'\$\d+', html_content)
    for m in matches:
        start = m.start()
        print(f"Price: {m.group()} at index {start}")
        print(html_content[max(0, start - 150): start + 250])
        print("-" * 50)
        
    # Let's search for "Enterprise" and see if there are other text blocks nearby
    # especially for pricing cards
    print("\n=== ENTERPRISE CARDS ===")
    ent_matches = re.finditer(r'Enterprise', html_content)
    for m in ent_matches:
        start = m.start()
        print(f"Enterprise at {start}")
        print(html_content[max(0, start - 200): start + 600])
        print("=" * 60)

if __name__ == '__main__':
    main()
