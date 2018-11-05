cd C:\Program Files\7-Zip
7z a C:\Users\jason.c\Playground\pips-pro\lambda\%1.zip C:\Users\jason.c\Playground\pips-pro\lambda\%1\*
aws lambda update-function-code --function-name %1 --zip-file fileb:///Users/jason.c/Playground/pips-pro/lambda/%1.zip && cd C:\Users\jason.c\Playground\pips-pro\lambda && del %1.zip
