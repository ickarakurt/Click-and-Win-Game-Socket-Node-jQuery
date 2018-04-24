# Click and Win

### demo -> http://click-and-win.herokuapp.com/

#### About Click and Game
Click and Win is a kind of game. If user want to win the game, he/she have to click faster than enemy.
#### How to Play ?
You are two friends. One of you create room a special name (with some settings - range and speed). Other friend join the game with using room name.
#### Used Technologies
* HTML
* CSS
* Node.js(Socket.io,Pug,Express)
* Javascript - jQuery

#### Installation

-> Change Directory
```
cd /var/www
```
->Clone the repository
```
git clone https://github.com/ickarakurt/Click-and-Win-Game-Socket-Node-jQuery.git .
```
-> Edit main.js
```
cd /public/javascripts/
nano main.js
```
* On line 43 edit website adress

-> Install Packages
```
npm install
```
-> Install pm2 Package

```
npm install pm2 -g
```
-> Start App
```
cd /var/www
pm2 start app.js
```
### issues to be solved soon
* If room name is empty ,socket can't work.
* click event on waiting your enemy , adding display none on title









