def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("3 Open slots")
    if idx != -1:
        print("Raw context around '3 Open slots' (extended):")
        # Print 4000 chars before
        print(html_content[max(0, idx - 4500): idx - 1000])

if __name__ == '__main__':
    main()
