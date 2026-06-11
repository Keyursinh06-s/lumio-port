import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    targets = ["svg12600469402", "svg12172246408", "svg9365522886"]
    for target in targets:
        print(f"Searching for {target}...")
        # find matches and print context
        matches = [m.start() for m in re.finditer(target, html_content)]
        print(f"Found {len(matches)} matches:")
        for idx in matches:
            print(f"  Context at index {idx}:")
            print(html_content[max(0, idx-100): idx+300])
            print("-" * 50)

if __name__ == '__main__':
    main()
