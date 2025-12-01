## 组件

基于 tailwind，参考自 [neo-brutalism-ui-library](https://neo-brutalism-ui-library.vercel.app/)。

### Button

```html
<div class="flex justify-evenly space-x-6">
  <button
    class="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
  >
    Simple Button
  </button>
  <button
    class="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
  >
    Medium Rounded Button
  </button>
  <button
    class="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full"
  >
    Full Rounded Button
  </button>
</div>
```

### Card

```html
<div
  class="w-80 h-full border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white"
>
  <a href="" class="block cursor-pointer">
    <article class="w-full h-full">
      <figure class="w-full h-1/2 border-black border-b-2">
        <img
          src="https://neo-brutalism-ui-library.vercel.app/assets/neo-brutalism-image3-6c6a875b.jpg"
          alt="thumbnail"
          class="w-full h-full object-cover"
        />
      </figure>
      <div class="px-6 py-5 text-left h-full">
        <p class="text-base mb-4">May 15th, 2023</p>
        <h1 class="text-[32px] mb-4">Neo Brutallism</h1>
        <p class="text-xs mb-4 line-clamp-4">
          Neobrutalism is an aesthetic characterized by high contrast elements, bright colors, and
          bold shapes. It is often used to make a statement, as it is meant to be eye-catching and
          stand out to the viewer. It is also used in user interface and web design, with features
          such as vibrant colors and bold shapes. Neobrutalism can also be used in print design,
          with an example being a bold shape with a vibrant color fill applied to it.
        </p>
        <strong>Read More</strong>
      </div>
    </article>
  </a>
</div>
```

### Input

```html
<div class="flex flex-col space-y-6">
  <input
    class="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
    placeholder="you@example.com"
  />
  <input
    class="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
    placeholder="you@example.com"
  />
  <input
    class="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-full"
    placeholder="you@example.com"
  />
</div>
```

### Dialog

```html
<div
  class="w-96 px-8 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center"
>
  <div>
    <h1 class="text-2xl mb-4">The message you want goes in here.</h1>
    <div class="flex space-x-2 mx-auto w-32">
      <button class="text-base">Cancel</button>
      <button
        class="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full"
      >
        Enable
      </button>
    </div>
  </div>
</div>
```

### Checkbox

```ts
import classNames from "classnames";
import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          className={classNames(
            "appearance-none outline-none block relative text-center cursor-pointer m-auto w-5 h-5 before:rounded-sm before:block before:absolute before:content-[''] before:bg-[#FFC29F] before:w-5 before:h-5 before:rounded-sm before:border-black before:border-2 before:hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]  after:block after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-2 after:h-3 after:border-black after:border-r-2 after:border-b-2 after:origin-center after:rotate-45",
            { "after:opacity-1 before:checked:bg-[#FF965B]": checked },
            { "after:opacity-0": checked === false }
          )}
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
      </label>
    </>
  );
};

export default Checkbox;
```

### Dropdown

```ts
import classNames from "classnames";
import { useState } from "react";

const DropDown = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-72 justify-center gap-x-1.5 bg-[#B8FF9F] hover:bg-[#99fc77] px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setOpen(!open)}
          >
            Options
            <svg
              className="mt-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={classNames(
            "w-72 absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black",
            { hidden: !open }
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div role="none">
            <a
              href=""
              className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
              role="menuitem"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href=""
              className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
              role="menuitem"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href=""
              className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
              role="menuitem"
              id="menu-item-2"
            >
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                role="menuitem"
                // tabindex="-1"
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
```

### ToggleSwitch

```ts
const ToggleSwitch = () => {

  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div
        className="
          w-11 h-6
          bg-gray-400
          rounded-full
          border-2 border-black
          peer-checked:bg-pink-300
          peer-checked:shadow-[2px_2px_0px_rgba(0,0,0,1)]
          after:content-['']
          after:absolute
          after:top-[4px]
          after:left-[4px]
          after:w-4
          after:h-4
          after:bg-white
          after:rounded-full
          after:border-2
          after:border-black
          after:transition-all
          peer-checked:after:translate-x-5
        "
      ></div>
      <span className="ms-3 text-md font-medium">Toggle me</span>
    </label>
  );
};

export default ToggleSwitch;
```

### ProgressBar

```ts
const ProgressBar = ({
  minValue = 0,
  maxValue = 100,
  rounded = "none",
  color = "cyan",
  currentValue = 0,
  showPercentage = true,
  disabled,
  className,
}: ProgressBarType) => {
  const clampedValue = Math.min(maxValue, Math.max(currentValue, minValue));
  const widthPercentage =
    ((clampedValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <div
      className={classNames(
        "w-72 md:w-full max-w-md border-black border-2 focus:outline-none h-9 overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white",
        { "rounded-none": rounded === "none" },
        { "rounded-md": rounded === "md" },
        { "rounded-full": rounded === "full" },
        { "shadow-[2px_2px_0px_rgba(0,0,0,1)]": !disabled },
        {
          "border-[#727272] bg-[#D4D4D4] text-[#676767] hover:bg-[#D4D4D4] hover:shadow-none active:bg-[#D4D4D4]":
            disabled,
        },
        className
      )}
    >
      <div
        style={{ width: widthPercentage + "%" }}
        className={classNames(
          "h-full flex flex-row items-center justify-end overflow-hidden",
          {
            "bg-violet-200 hover:bg-violet-300":
              color === "violet" && !disabled,
          },
          {
            "bg-pink-200 hover:bg-pink-300": color === "pink" && !disabled,
          },
          {
            "bg-red-200 hover:bg-red-300": color === "red" && !disabled,
          },
          {
            "bg-orange-200 hover:bg-orange-300":
              color === "orange" && !disabled,
          },
          {
            "bg-yellow-200 hover:bg-yellow-300":
              color === "yellow" && !disabled,
          },
          {
            "bg-lime-200 hover:bg-lime-300": color === "lime" && !disabled,
          },
          {
            "bg-cyan-200 hover:bg-cyan-300": color === "cyan" && !disabled,
          },
          { "rounded-none": rounded === "none" },
          { "rounded-md": rounded === "md" },
          { "rounded-full": rounded === "full" }
        )}
      >
        {showPercentage && !disabled && (
          <h1
            className={classNames(
              "mr-2",
              widthPercentage !== 100 ? "font-bold" : "font-black",
                     widthPercentage !== 100 ? "opacity-60" : "opacity-100",
              className
            )}
          >
            {Math.round(widthPercentage)}%
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
```
