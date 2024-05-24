# Welcome to ParkMate
ParkMate simplifies your parking experience with a user-friendly app. Quickly locate available parking spots, reserve in advance, and set your preferred parking duration. Our app calculates payments based on location and time, ensuring transparency. ParkMate provides digital receipts, making your parking transactions convenient and organized. Say goodbye to parking hassles – ParkMate is your reliable companion for stress-free parking.

# Noticed in testing

Always <code>use waitFor(() => {})</code> when trying to test a server component. Don't be like me! and always mock functions that has async ()!

# Github desktop errors encountered
Fixed my issues related to husky
```bash
git config --unset core.hooksPath
```
<code>
/bin/bash: C:/Program Files/nodejs/npx: No such file or directory husky - pre-commit script failed (code 127)
</code>