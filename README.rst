What is itemspicker?
====================

Itemspicker is a jQuery_. plugin, which helps managing selectable items. It hooks on a bunch of any DOM elements (e.g. <li>) and waits for some trigger (usually click) to toggle item's deffined class (default "selected").

.. _jQuery: http://jquery.com/


Disclaimer
==========

This is my first jQuery plugin, so there's a big chance it fails to follow its convention or may even be writen wrong. Any suggestions (and patches) are greatly encouraged and will be appreciated.


Usage
=====

Usage of itemspicker doesn't differ from other jQuery plugins.

Suppose you have this html code::

    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

By invoking itemspicker function <ul> element, one makes its items selectable::

    $("ul").itemspicker({
        items: "li",
        max: -1,
        selectionChanged: function() { console.log("Selection changed") }
    });
    
There are only 4 important arguments of this function:

- **items** – the only of required – selector for selectable items
- **max** – maximum number of selected items; -1 means unlimited (default: 1)
- **selectedClass** – class to be applied to selected items (default: "selected")
- **selectionChanged** – function, which will be called when item is selected or deselected


There are some live examples of the plugin in action:

- `Basic example`_ – select any number of items
- `Only one`_ – only one item can be selected
- `With callback`_ – use callback to show count of selected items
- `Different class`_ – shows usage of custom class name for selected items

.. _`Basic example`: http://jsfiddle.net/azdyb/7Cq7G/
.. _`Only one`: http://jsfiddle.net/azdyb/jxVmS/
.. _`With callback`: http://jsfiddle.net/azdyb/jEyah/
.. _`Different class`: http://jsfiddle.net/azdyb/SsSQb/


License
=======

Copyright 2012 Aleksander Zdyb

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see http://www.gnu.org/licenses/.
