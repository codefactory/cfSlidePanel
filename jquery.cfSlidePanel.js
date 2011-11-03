/*
 * 안녕하세요 코드팩토리입니다. http://codefactory.kr, [프로그램 개발문의] master@codefactory.kr
 * 이 프로그램은 아무런 제약없이 복사/수정/재배포 하셔도 되며 주석을 지우셔도 됩니다.
 * 감사합니다.
 */

// 모바일 기기에서 터치 swipe(플리킹)로, PC에서는 mousemove로 패널을 좌우 슬라이딩 할 수 있게 해주는 plugin 입니다.

;(function($, window, document, undefined) {
	
	// plugin 이름, default option 설정
	var pluginName = 'cfSlidePanel',
		defaults = {
			verticalScroll: false,
			getIndex: null,			// navigator를 만들 때 사용할 수 있는 index를 얻어내는 callback
									// function(index) { alert(index); } 와 같이 등록하면 슬라이드 애니메이션에 대한 callback으로 패널의 index를 얻을 수 있음(zero based index),
			prevBtn: '.prev',
			nextBtn: '.next'
		};
		
	// 변수
	
		
	// plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}
	
	// initialization logic
	Plugin.prototype.init = function() {
		
		var $this = $(this.element),
			options = this.options,
			panels = $this.find('.panel'),
			panelLength = panels.length,
			panelWidth = $this.width();
			
		// 일단 가리고 ul 생성 후 li에 넣음
		panels.hide();
		
		// ul 생성 후 container에 append
		$('<ul />', {
			'class': 'cf-slide-panel-ul'
		}).css({
			listStyle: 'none',
			margin: 0,
			padding: 0,
			width: panelWidth * panelLength
		}).appendTo(this.element);
		
		// 각 페이지들을 li에 append
		panels.each(function(index) {
			$('<li />', {
				'class': 'cf-slide-panel-item',
				html: this,
				'data-index': index
			}).css({
				'float': 'left',
				width: panelWidth
			}).appendTo('ul.cf-slide-panel-ul');
		});
		
		// ul, li 작업이 다 끝나면 다시 보이게 함
		panels.show();
		
		sessionStorage.cfSlidePanelCurrentIndex = undefined;
		
		// cfSlider
		$this.cfSlider({
			container: '.cf-slide-panel-ul',
			item: '.cf-slide-panel-item',
			prevEventType: 'cf-slide-panel-prev',
			nextEventType: 'cf-slide-panel-next',
			prevBtn: options.prevBtn,
			nextBtn: options.nextBtn,
			callback: function(item) {
				sessionStorage.cfSlidePanelCurrentIndex = $(item).data('index');
				
				if (typeof options.getIndex === 'function') {
					options.getIndex($(item).data('index'));
				}
			}
		}).each(function() {
			if (sessionStorage.cfSlidePanelCurrentIndex != undefined) {
				$('.cf-slide-panel-ul').css({
					marginLeft: -(panelWidth * (parseInt(sessionStorage.cfSlidePanelCurrentIndex) + 1)) + 'px'
				});
			}
		});
		
		// cfTouchSwipe
		$this.cfTouchSwipe({
			swipeLeft: function() {
				$this.trigger('cf-slide-panel-next');
			},
			swipeRight: function() {
				$this.trigger('cf-slide-panel-prev');
			},
			preventDefault: ! options.verticalScroll
		});
		
		
		// panel 너비가 100%였을 경우에는 orientation이 바뀌었을 때  panel 너버의 px 값이 바뀌므로 계산을 새로 해서 cfSlider를 다시 만들어줌
		$(window).bind('orientationchange', function() {
			
			setTimeout(function() {
				
				var panels = $this.find('.panel'),
					panelLength = panels.length,
					panelWidth = $this.width();
					
				$('div.cf-slide-panel-container').css({
					width: panelWidth
				});
				
				$('li.cf-slide-panel-item').css({
					width: panelWidth
				});
				
				// cfSlider - orientation이 바뀌면 panelWidth가 바뀌기 때문에 cfSlider를 다시 만들어줌
				$this.cfSlider({
					container: '.cf-slide-panel-ul',
					item: '.cf-slide-panel-item',
					prevEventType: 'cf-slide-panel-prev',
					nextEventType: 'cf-slide-panel-next',
					prevBtn: options.prevBtn,
					nextBtn: options.nextBtn,
					callback: function(item) {
						sessionStorage.cfSlidePanelCurrentIndex = $(item).data('index');
						
						if (typeof options.getIndex === 'function') {
							options.getIndex($(item).data('index'));
						}
					}
				}).each(function() {
					if (sessionStorage.cfSlidePanelCurrentIndex != undefined) {
						$('.cf-slide-panel-ul').css({
							marginLeft: -(panelWidth * (parseInt(sessionStorage.cfSlidePanelCurrentIndex) + 1)) + 'px'
						});
					}
				});
				
			}, 100);	// orientation이 바뀌고 난 후 약간의 시간여유를 두고 실행
			
		});
		
	};
	
	// jQuery 객체와 element의 data에 plugin을 넣음
	$.fn[pluginName] = function(options) {
		
		return this.each(function() {
			
			if ( ! $.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
			
		});
		
	};
	
})(jQuery, window, document);
