def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("class=\"framer-e5lm0g\"")
    if idx != -1:
        print("framer-e5lm0g details:")
        print(html_content[idx: idx + 800])

if __name__ == '__main__':
    main()
