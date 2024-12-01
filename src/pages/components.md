# Components

In the frontend world we have two types of "components" which this template ships with:

1. UI/Frontend Components - these are just VueJS components which can be used wherever you like
2. Composables - these provide useful abstractions and short hands but aren't a widget on a screen


## UI / Frontend Components

### Pop

Produces a <Pop id="pop-example" text="this is popover text">popover</Pop> effect.

```html
<pop text="this is popover text">Popover's</pop> are the best!
```

- using the `text` property a simple text message or for greater control, the `#popover` slot.
- if you want to engage the popover on _hover_ versus touch/click events you can do that by adding the <pop hover text="text shows on hovering">hover</pop>.
- by default it uses the soft-exit approach which closes the dialog on:
  - clicking outside the area
  - pressing the ESC key
- if you want to take control over the close/exit functionality provide a `#close` template.
- if you provide a `role` property to the component, it will be added as an Aria Role on the source element
- in all cases, a semantic relationship between the source and target are setup using the Aria `aria-details` property.
- both the `popover-target` and `aria-details` properties on the source _must_ point to a valid `id` attribute on the target element. If you provide the `id` property that will be used, otherwise a **ccuid** algorithm will generate a random one.

> **Note:** in order to provide full browser support we have added the [css-anchor-positioning](https://github.com/oddbird/css-anchor-positioning) polyfill in the `index.html`. This bring support to all major evergreen browsers, if you need IE browser support then you should not use this.

<pop >
    Advanced
    <template #popover>
        There I was, there I was
    </template>
</pop>


### Avatar

<Avatar initials="KS" />

Provides a circular representation for a person/user which when clicked opens up a details menu.


### Badge and Tag

An empty **badge** <badge />, a numeric **badge** <badge color="orange">1</badge>, and a **tag** <tag>foo</tag> are walking down the street.

#### Sizing and Position

<badge size="xs">1</badge> <badge size="sm">2</badge>
<badge size="md">3</badge> <badge size="lg">4</badge>
<badge size="xl" >5</badge> prose text&nbsp;

<badge size="xs" subscript>1</badge> <badge size="sm" subscript>2</badge>
<badge size="md" subscript>3</badge> <badge size="lg" subscript>4</badge>
<badge size="xl" >5</badge> subscript&nbsp;

<badge size="xs" superscript>1</badge> <badge size="sm" superscript>2</badge>
<badge size="md" superscript>3</badge> <badge size="lg" superscript>4</badge>
<badge size="xl" >5</badge> superscript&nbsp;

##### Tags

<tag size="xs">xs</tag> <tag size="sm">sm</tag>&nbsp;
<tag size="md">md</tag> <tag size="lg">lg</tag>&nbsp;
<tag size="xl" >xl</tag> prose text&nbsp;

<tag size="xs" subscript>xs</tag> <tag size="sm" subscript>sm</tag>&nbsp;
<tag size="md" subscript>md</tag> <tag size="lg" subscript>lg</tag>&nbsp;
<tag size="xl" >xl</tag> sub&nbsp;

<tag size="xs" superscript>1</tag> <tag size="sm" superscript>2</tag>&nbsp;
<tag size="md" superscript>3</tag> <tag size="lg" superscript>4</tag>&nbsp;
<tag size="xl" >5</tag> super&nbsp;


### Blurry

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
