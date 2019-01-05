from matplotlib import pyplot as plt

from collections import Counter
grades = [83,95,91,87,70,0,85,82,100,67,73,77,0]

# Bucket grades by decile, but put 100 in with the 90s
decile = lambda grade: min(grade // 10 * 10, 90)
histogram = Counter(decile(grade) for grade in grades)

plt.bar([x + 5 for x in histogram.keys()],  # shift bars right by 5
        histogram.values(),                 # give each bar its correct height
        10,                                 # give each bar a width of 8
        edgecolor=(0, 0, 0))                # black edges for each bar

plt.axis([-5, 105, 0, 5])                  # x-axis from -5 to 105,
                                           # y-axis from 0 to 5

plt.xticks([10 * i for i in range(11)])    # x-axis labels at 0, 10, ..., 100
plt.xlabel("Decile")
plt.ylabel("# of Students")
plt.title("Distribution of Exam 1 Grades")
plt.show()