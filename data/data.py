#!/usr/bin/env python3
import os
import json

# little script i wrote to make getting information for each
# image into a json file easier

def main():
    dict = {
        "books": []
    }

    for file in os.listdir('./images'):
        title = input(f"title for {file}: ")
        price = float(input(f"paperback price for {title}: "))
        price2 = price + 5
        img_path = f"data/images/{file}"

        book = {
            "title": title,
            "img": img_path,
            "softPrice": price,
            "hardPrice": price2,
        }

        dict['books'].append(book)

    with open('books.json', 'w', encoding='utf-8') as file:
        json.dump(dict, file, indent=4)


if __name__ == '__main__':
    main()