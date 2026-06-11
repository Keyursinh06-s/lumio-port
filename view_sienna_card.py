def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("data-framer-name=\"Sienna\"")
    if idx == -1:
        idx = html_content.find("Sienna")
        
    if idx != -1:
        print("Sienna card details:")
        print(html_content[max(0, idx - 500): idx + 2000])

if __name__ == '__main__':
    main()
