def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's search for "lGU6LhhlX7UVolkKorteot0QMI" in the HTML and print its usage context
    idx = html_content.find("lGU6LhhlX7UVolkKorteot0QMI")
    while idx != -1:
        print(f"Occurrence at {idx}:")
        print(html_content[max(0, idx - 200): idx + 300])
        print("-" * 50)
        idx = html_content.find("lGU6LhhlX7UVolkKorteot0QMI", idx + 1)

if __name__ == '__main__':
    main()
