const user = [
    { firstName: 'John', lastName: 'Doe', customerID: 1212, profession: 'student' },
    { firstName: 'Jane', lastName: 'Smith', customerID: 3333, profession: 'freelancer' },
    { firstName: 'Alice', lastName: 'Johnson', customerID: 9453, profession: 'engineer' },
    { firstName: 'Bob', lastName: 'Brown', customerID: 1122, profession: 'systemAnalytics' }, 
    { firstName: 'Charlie', lastName: '', customerID: 7788, profession: 'productOwner' }
  ];
// Q1-1
function sortUserName(user) {
    return user 
    .filter(person => {
      const validName = typeof person.firstName === 'string' && typeof person.lastName === 'string';
      const validNumber = typeof person.customerID === 'number';

      return validName && validNumber;
    })
}
const sortedUsers = sortUserName(user);
console.log(sortedUsers);

// Q1-2
const professionOrder = {
    'systemAnalytics': 1,
    'engineer': 2,
    'productOwner': 3,
    'freelancer': 4,
    'student': 5,
  };
function sortByType(a, b) {
const professionA = professionOrder[a.profession];
const professionB = professionOrder[b.profession];
return professionA - professionB;
}
const sortedProfessions = user.sort(sortByType);
console.log(sortedProfessions);

// Q2
/* Explain why does this color not works, and how to fix make it work on 1st list */
li .item選擇器權重更高比.item更針對此屬性標籤下的的顏色高過於上一層.item的blue
.container .shop-list li.item { color: green;
}
要解決此問題： 強制提權最高級
.container .shop-list .item {
    color: blue !important;
  }
/* Write styling make every other line give background color to next one */
.container .shop-list li.item:nth-child(odd) {
    background-color: #ffffff; 
  }
  
// Q3
let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];

function getUniqueNumber (items) {
  const uniqueItems = new Set(items);
  const uniqueArray = Array.from(uniqueItems);
  console.log(uniqueArray);
}
getUniqueNumber(items);

// Q4
// Interface 在 typescript 強型別裡面蠻常使用到， 用於定義物件的結構，確保物件具備特定的屬性和方法，從而增強代碼的維護性與可靠性。
interface Person {
    firstName: string;
    lastName: string;
    age: number;
    sayHello: () => void;
  }
  
  const student: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 21,
    sayHello: () => {
      console.log("Hello!");
    }
  };
  
  student.sayHello();

// Enum 枚舉定義一組命名的常數，例如表示一周的天數、顏色、方向等。
enum Direction {
    Up,
    Down,
    Left,
    Right
  }
  
  function move(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        console.log("Moving up!");
        break;
      case Direction.Down:
        console.log("Moving down!");
        break;
      case Direction.Left:
        console.log("Moving left!");
        break;
      case Direction.Right:
        console.log("Moving right!");
        break;
    }
  }

  move(Direction.Up);
  
// Q5
// 問題:
handleAddCount方法中有多個 this.setState的重複調用以及沒有用正確的大括號封閉會導致語法錯誤無法運行。
count: this.state.count + 1 一樣的問題重複調用會導致語法錯誤無法運行。
render() { 也沒有用正確的封閉大括號導致語法錯誤。
// 修改後代碼
class Count extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        // 綁定this
        this.handleAddCount = this.handleAddCount.bind(this);
    }
    
    handleAddCount() {
        // 使用箭頭函數
        this.setState((prevState) => ({
        count: prevState.count + 1,
        }));
    }
    
    render() {
        return (
        <div>
            <h2>{this.state.count}</h2>
            {/* 正確封閉JSX大括號 */}
            <button onClick={this.handleAddCount}>Add</button>
        </div>
        );
    }
    }
    
    ReactDOM.render(<Count />, document.getElementById('root'));
    
// Q6
在 React 應用中，特別是在處理輸入框（如搜尋框）時，每次輸入變化都會觸發一個事件，
這可能會導致大量的 API 請求，從而降低性能。為了解決這個問題，我們可以使用防抖（debounce）技術，
這樣可以在輸入停止後的一段時間內只觸發一次請求。

import React from 'react';
import _ from 'lodash';

var SearchBox = React.createClass({
  componentDidMount: function() {
    // _是loash常見的命名方式
    this.handleOnChange = _.debounce(this.handleOnChange, 300);
  },

  render: function() {
    return <input type="search" name="p" onChange={this.handleOnChange} />;
  },

  handleOnChange: function(event) {
    // 在此處進行 AJAX 請求
    console.log('AJAX call with query:', event.target.value);
  }
});

export default SearchBox;
