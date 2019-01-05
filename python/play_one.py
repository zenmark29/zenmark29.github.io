names = ["Alice", "Bob", "Charlie", "Debbie"]

# not Pythonic
print("not pythonic:")
for i in range(len(names)):
    print(f"name {i} is {names[i]}")

print("")
print("also not pythonic:")

# also not Pythonic
i = 0
for name in names:
    print(f"name {i} is {names[i]}")
    i += 1

print("")
print("Pythonic:")
# Pythonic
for i, name in enumerate(names):
    print(f"name {i} is {name}")