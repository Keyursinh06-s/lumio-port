def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    # Let's print 1000 characters from index 379166
    print(content[379166: 380500])

if __name__ == '__main__':
    main()
