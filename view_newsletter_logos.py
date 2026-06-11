def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("Unlock top-tier")
    if idx != -1:
        print("Newsletter logos context:")
        # Look further down to find the sponsor logo images
        print(html_content[idx + 1500: idx + 6000])

if __name__ == '__main__':
    main()
