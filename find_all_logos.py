import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's search for "logo" near project names
    projects = ["Sienna", "Growly", "Glidex", "Aether Studio", "VaultX"]
    for name in projects:
        idx = html_content.find(name)
        print(f"=== Project: {name} ===")
        if idx != -1:
            context = html_content[max(0, idx - 500): idx + 1000]
            # Search for any SVG in this context
            svgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+\.svg', context)
            print("Found SVGs:")
            for s in set(svgs):
                print(f"  {s}")

if __name__ == '__main__':
    main()
