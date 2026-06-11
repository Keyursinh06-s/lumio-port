def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("framer-e5lm0g")
    while idx != -1:
        print(f"Match at {idx}:")
        print(html_content[max(0, idx - 150): idx + 400])
        print("-" * 50)
        idx = html_content.find("framer-e5lm0g", idx + 1)

if __name__ == '__main__':
    main()
