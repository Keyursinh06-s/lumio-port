import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search for Olivia Bennett, Emily Carter, James Reynolds, Sophia Martinez, Michael Thompson
    # and find what image src is near them.
    names = ["Emily Carter", "James Reynolds", "Sophia Martinez", "Michael Thompson", "Olivia Bennett"]
    
    for name in names:
        idx = html_content.find(name)
        print(f"=== Name: {name} ===")
        if idx != -1:
            # Look at 2000 chars around the name
            context = html_content[max(0, idx - 1000): idx + 1000]
            # Find all image URLs in the context
            imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', context)
            print("Found images nearby:")
            for img in set(imgs):
                print(f"  {img}")
        else:
            print("Not found in index.html directly.")

if __name__ == '__main__':
    main()
