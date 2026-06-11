def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # We want to see where "fyfIz5kF0SZptIxKsUwkCMV6uZo.jpg" or "QfNceFUxWgH3y9ILTvFqZbeg15s.png" is used
    # Let's search for these in the HTML and print 150 chars before and after.
    
    for term in ["fyfIz5kF0SZptIxKsUwkCMV6uZo", "QfNceFUxWgH3y9ILTvFqZbeg15s"]:
        idx = html_content.find(term)
        print(f"=== Matches for {term} ===")
        while idx != -1:
            print(f"Match at {idx}:")
            print(html_content[max(0, idx - 150): idx + 250])
            print("-" * 50)
            idx = html_content.find(term, idx + 1)

if __name__ == '__main__':
    main()
