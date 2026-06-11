def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    print(content[380200: 381200])

if __name__ == '__main__':
    main()
