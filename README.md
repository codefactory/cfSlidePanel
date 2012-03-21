안녕하세요 코드팩토리입니다. http://codefactory.kr, [프로그램 개발문의] master@codefactory.kr

이 프로그램은 아무런 제약없이 복사/수정/재배포 하셔도 되며 주석을 지우셔도 됩니다.
감사합니다.

### 소개
모바일 기기에서 터치 swipe(플리킹)로, PC에서는 mousemove로 패널을 좌우 슬라이딩 할 수 있게 해주는 plugin 입니다.
http://m.naver.com 이나 http://m.daum.net 에서 기사 목록을 터치로 좌우로 움직일 수 있는 것과 같은 기능입니다.

[소스코드] https://github.com/codefactory/cfSlidePanel
[데모보기] http://codefactory.kr/demos/cfslidepanel

##### 참고
이 plugin을 사용하기 위해서 제가 전에 만든 cfSlider plugin을 같이 사용하고 있습니다.

cfSlider: https://github.com/codefactory/cfSlider



### 사용방법

다음과 같은 형태의 HTML 마크업이 필요합니다. 실제로 슬라이드될 패널들을 감싸는 container 엘리먼트가 필요하며 패널들에는 'panel'이라는 class를 지정해 줍니다. 

```html
<div id="container">
	<div class="panel">
		첫 번째 패널
	</div>
	<div class="panel">
		두 번째 패널
	</div>
	<div class="panel">
		세 번째 패널
	</div>
</div>
```


- 주의사항 -
각 패널에 해당하는 div들에 id를 주시면 안됩니다. 패널들은 cfSlidePanel에 의해 복제가 되어 dom에 중복되어 존재하게 되기 때문에 id는 적합한 선택자가 되지 못하게 됩니다. 선택자가 필요한 경우 불편하시겠지만 아래와 같이 class를 선택자로 사용해 주십시오

<div id="container">
	<div class="panel one">		<!-- 꼭 필요한 panel 클래스 외에 선택자로 사용하기 위해 one 클래스 추가 -->
		첫 번째 패널
	</div>
	<div class="panel two">		<!-- 꼭 필요한 panel 클래스 외에 선택자로 사용하기 위해 two 클래스 추가 -->
		두 번째 패널
	</div>
	<div class="panel three">	<!-- 꼭 필요한 panel 클래스 외에 선택자로 사용하기 위해 three 클래스 추가 -->
		세 번째 패널
	</div>
</div>


CSS 스타일은 아래와 같이 합니다. container역할을 하는 엘리먼트에는 width 속성을 꼭 지정해 주십시오. px 단위로 지정하실 수도 있습니다.

<style>
	#container {
		width: 100%;
	}
</style>


slide panel의 사용은 아래와 같이 합니다.

<script>
	$('#container').cfSlidePanel();
</script>


---------------------------------------
 * 옵션들
---------------------------------------
cfSlidePanel의 적용가능 옵션은 아래와 같습니다.

$('#container').cfSlidePanel({
	speed: 400,
	// 슬라이딩 속도, 밀리세컨드 단위의 숫자 또는 jQuery.animate()에 사용가능한 'slow', 'fast' 등 문자열
	touchMoveLength: 100,
	// px단위, 최소 얼마만큼 touchmove를 해야 패널을 움직일지 기준이 되는 길이
	getIndex: function(index) {
		alert(index);
	},
	// default값은 null입니다. 여기에 함수를 등록하면 index를 인자로 받아서 사용하실 수 있습니다. 슬라이드 애니메이션이 끝나고 현재 화면에 보이는 패널의 index를 받을 수 있으며 navigator 컨트롤을 만들 때 사용하시면 됩니다.
	prevBtn: null,
	// default값은 '.prev' 입니다. slide panel은 터치 swipe 말고 버튼 클릭방식으로도 슬라이드를 하실 수 있습니다. 이때 이전 패널 보기 버튼의 jQuery 셀렉터를 등록하시면 됩니다.
	nextBtn: null
	// default값은 '.next' 입니다. slide panel은 터치 swipe 말고 버튼 클릭방식으로도 슬라이드를 하실 수 있습니다. 이때 다음 패널 보기 버튼의 jQuery 셀렉터를 등록하시면 됩니다.
});
