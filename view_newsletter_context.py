def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("Unlock top-tier")
    if idx != -1:
        print("Newsletter context:")
        print(html_content[idx: idx + 2000])

if __name__ == '__main__':
    main()
