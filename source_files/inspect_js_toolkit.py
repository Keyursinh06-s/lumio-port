import re

def main():
    content = open('mjs_files/OAUmouvm7djFQXwZ1NECw_tUWXXWzd8mYcsIfl6g-9U.CkX2PD8K.mjs', encoding='utf-8').read()
    
    matches = [m.start() for m in re.finditer('Figma', content)]
    print(f"Found 'Figma' in JS {len(matches)} times:")
    for m in matches[:3]:
        print(content[max(0, m - 200): m + 600])
        print("-" * 50)

if __name__ == '__main__':
    main()
