mact: 간단한 react
jsx

템플릿에서 리턴한 string 갑을 jsx로 파싱
=> 렌더할때 jsx를 다시 변환

=> xml 형태로. 붙여넣기

- <comp>라는 컴포넌트로 처음에 만든다.
- nextNode가 나중에비교?

1. 일단은 <comp>안에 집어넣는다.
   $header.html 은 <comp>안에 있는 값을 불러온다.
   결국 하위 컴포넌트에서 비교는

문제는 새로 호출하지 않으면 props를 어떻게 바꾸는가.

결국 하위 컴포넌트를 새로 호출하면 state가 초기화되고
결국 하위 컴포넌트를 새로 호출하지 않으면 props가 변경되지 않는다.
그러면 current node가 다른거고 nextNode가 <comp>일때만

<div>
  <c-1/>
</div>

<div>
  <div>ex</div>
</div>

component=[{}]

이렇게 된다고 할때 ex라는 컴포넌트와 실제 jsx 혹은 돔 값을 둘ㄷ다 가지고 있어야한다.
updateProps메서드.
jsx 파싱할때 클래스가 있으면 new를 때릴수도 있고, 이미 있으면 updateProps때린다.
근데 부모 컴포넌트에서 하나의 자식 컴포넌트 여러개를 호출하면?? 즉 컴포넌트마다 id가 필요함.

1. 처음에 렌더링순서

2. 상위 컴포넌트에서 렌더링 순서
