import json

def main():
    data = json.load(open('src/assets/projects_data.json', encoding='utf-8'))
    for proj in data:
        print(f"\nProject: {proj['title']}")
        print("Images:")
        for idx, img in enumerate(proj['images']):
            print(f"  {idx}: {img}")

if __name__ == '__main__':
    main()
