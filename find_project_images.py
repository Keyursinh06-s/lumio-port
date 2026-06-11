import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    projects = ["Sienna", "Growly", "Glidex", "Aether Studio", "VaultX"]
    
    for name in projects:
        idx = html_content.find(name)
        print(f"=== Project: {name} ===")
        if idx != -1:
            context = html_content[max(0, idx - 1500): idx + 1000]
            # Search for images in this context
            imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', context)
            print("Found images nearby:")
            for img in set(imgs):
                print(f"  {img}")

if __name__ == '__main__':
    main()
