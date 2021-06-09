<template>
  <div class="page-body">
    <div class="slogan-section container-1180">
      <div class="slogan-content">
        <div class="slogan-content-hd">
          <div class="slogan-left">
            <div class="slogan-up">让每个人都能拥有</div>
            <div class="slogan-down">
              <div>好设计</div>
              <div>
                <vue-typed-js
                  :strings="['自学设计家', '找设计师', '找客户']"
                  :loop="true"
                  :typeSpeed="100"
                  :backSpeed="100"
                  :smartBackspace="false"
                >
                  <span class="slogan-container typing"></span>
                </vue-typed-js>
              </div>
            </div>
          </div>
          <div class="slogan-middle">
            <span>家装领域<br />“价值观”驱动平台</span>
          </div>
          <div class="slogan-right">
            <img class="slogan-circle" src="~/images/home/slogan-circle.svg" />
            <img class="slogan-icon" :src="imagesUrl[imgindex]" />
          </div>
        </div>
        <div class="slogan-content-ft">
          <img class="slogan-img" src="~/images/home/slogan-img.jpg" />
        </div>
      </div>
    </div>
    <div class="people-section container-1180">
      <div class="people-title">
        <span class="page-font1">专为不同人群打造的课程体系</span>
      </div>
      <div class="people-img">
        <img src="~/images/home/dongshouzu.svg" />
        <img class="people-space" src="~/images/home/aihaozhe.svg" />
        <img src="~images/home/zhuanyeren.svg" />
      </div>
      <div class="people-img page-font2">
        <span>有房要装的动手族</span
        ><span class="people-space">开拓副业的爱好者</span
        ><span>设计为生的专业人</span>
      </div>
    </div>
    <div class="course-section container-1180">
      <div class="course-list">
        <span class="page-font3">家计划视频课</span
        ><span class="page-font4 course-left">日常布局小课堂</span
        ><span class="page-font5 course-left">斗西魔改家</span>
      </div>
      <div class="course-right">
        <span class="page-font5">查看全部&nbsp;&rarr;</span>
      </div>
      <div class="course-content">
        <div class="course-free">
          <img class="course-freeimage" src="~/images/home/course-img1.png" />
          <div class="course-text">
            <div class="course-title">
              动线+热区别乱做！中看不中用，入住悔断肠
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="~/images/home/course-img1.png" />
          <div class="course-text">
            <div class="course-title">
              免费设计和¥1000/m2的设计师区别在哪？一个视频让你明白
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="~/images/home/course-img1.png" />
          <div class="course-text">
            <div class="course-title">
              U型厨房要注意，台面过窄是禁忌！
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              7分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="~/images/home/course-img1.png" />
          <div class="course-text">
            <div class="course-title">
              时代变了！乱画平面图也叫设计师吗？
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              17分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-list">
        <span class="page-font3">家计划体系课</span
        ><span class="page-font4 course-left">户型布局</span
        ><span class="page-font5 course-left">软装设计</span>
      </div>
      <div class="course-right">
        <span class="page-font5">查看全部&nbsp;&rarr;</span>
      </div>
      <div class="course-content">
        <div class="course-charge">
          <img class="course-chargeimage" src="~/images/home/course-img2.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·软装进行时
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-charge">
          <img class="course-chargeimage" src="~/images/home/course-img3.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·平面布局的小秘密
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-charge">
          <img class="course-chargeimage" src="~/images/home/course-img2.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·软装进行时
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              7分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-xueshe container-1180">
        <span>斗西家学社&nbsp;&rarr;</span>
      </div>
    </div>
    <div class="plango-section container-1180">
      <div class="plango">
        <span class="page-font1 plango-title">Plan Go</span
        ><span class="page-font2"
          >满足设计师的专业需求，同时小白也可轻松上手</span
        >
      </div>
      <div class="plango-content">
        <div class="plango-img">
          <img class="plango-img" :src="plangoUrl[plangoIndex]" />
        </div>
        <div class="plango-text">
          <div
            class="plango-sub"
            @mouseover="handleChangeplangoIndex(0)"
            :style="[plangoIndex === 0 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 0 ? 'filter: none' : ''] + ''"
              src="~/images/home/huxing.svg"
            />
            <div class="plango-subwidth">
              <div
                class="plango-subtext"
                :style="[plangoIndex === 0 ? 'color: #14AF64;' : ''] + ''"
              >
                户型精准匹配
              </div>
              <span class="plango-hoversub" v-if="plangoIndex === 0"
                >跟你的家绝配</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangeplangoIndex(1)"
            :style="[plangoIndex === 1 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 1 ? 'filter: none' : ''] + ''"
              src="~/images/home/moxing.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 1 ? 'color: #14AF64;' : ''] + ''"
                >海量模型均可购买</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 1"
                >真的很多件，件件「超」美线</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangeplangoIndex(2)"
            :style="[plangoIndex === 2 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 2 ? 'filter: none' : ''] + ''"
              src="~/images/home/yusuan.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 2 ? 'color: #14AF64;' : ''] + ''"
                >预算实时可见</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 2"
                >照着清单买，设计落地马上来</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangeplangoIndex(3)"
            :style="[plangoIndex === 3 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 3 ? 'filter: none' : ''] + ''"
              src="~/images/home/qingdan.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 3 ? 'color: #14AF64;' : ''] + ''"
                >即刻生成购买清单</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 3"
                >即刻生成购买清单</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prize-section container-1180">
      <div class="plango">
        <span class="page-font1 prize-padding">见证我们的团队实力</span>
      </div>
      <div class="prize">
        <div class="prize-text">
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(0)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />FRAME 刊登
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(1)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />艾特金奖
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(2)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />艾鼎银奖
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(3)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />FRAME Awards 2019
          </div>
        </div>
        <div class="prize-container">
          <img
            :class="[prizeindex === 0 ? isBig : isSmall, 'prize-position1']"
            src="~/images/home/itafe.png"
          />
          <img
            :class="[prizeindex === 1 ? isBig : isSmall, 'prize-position2']"
            src="~/images/home/aite.png"
          />
          <img
            :class="[prizeindex === 2 ? isBig : isSmall, 'prize-position3']"
            src="~/images/home/aiding.png"
          />
          <img
            :class="[prizeindex === 3 ? isBig : isSmall, 'prize-position4']"
            src="~/images/home/frame.png"
          />
        </div>
      </div>
    </div>
    <div class="feedback-section">
      <div class="feedback">
        <span class="page-font1 plango-title">学员对我们的认可</span
        ><span class="page-font2">体验了我们课程的学员这样说</span>
      </div>
      <div class="feedback-content">
        <carousel
          class="feedback-container"
          :paginationEnabled="false"
          :perPage="8"
          :scrollPerPage="false"
        >
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              很可惜户型改造课没有时间实时跟进课程，最后放假才慢慢补了课，一如既往干货满满收货很多。但我想实时跟进课程的效果应该会更好，所以很期待马上要开始的软装课。
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">童萌洁</span><br /><span class="cnt5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              说是顺利结束，可是马上又开始了~期待软装课，也谢谢老师给我在布局上的建议，上完软装课，我自己考完职称，在秋天开始的时候我就可以开始动工了呢，小学的时候就想过以后的梦想是做室内设计，那时家里刚有房子，第一次有自己的房间，我说想要粉色的房间，设计师帮我完成我的想法，我觉得他特别的酷，可惜后来自己没有朝这个职业方向走去，谢谢斗西的团队让我在毕业那么多年后，有了自己房子之后，有能力设计自己的家，自己小时候的梦想算是有一点点着落，再次感谢~
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">苏闽</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              从硬装布局到赏金设计团，再等待软装课，一直跟着斗西老师在学习家装内容，希望能自己设计一个合心意的家。毕竟房子是个价值巨大且对普通家庭来说没有后悔药的商品，再赋予家的含义，对任何一个家庭来说都意义重大。希望咱们这系列的课程可以一直办下去。若是能在买房前就学习到这些知识才是最优解。斗西老师和女团们每天都要加油鸭！
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">Honeyblood</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              感恩老师们的所有辛苦付出，爱你们～超有幸能在这样的天团带领下学习，收获了不仅仅有装修的知识，更多是人生思考模式，人生何处不设计。嗯。就这样吧，反正还报了软装也不是很感伤，咳，就，回见～（你们是最闪耀的天团～
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">阿比甲当嘎</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              感恩老师们的所有辛苦付出，爱你们～超有幸能在这样的天团带领下学习，收获了不仅仅有装修的知识，更多是人生思考模式，人生何处不设计。嗯。就这样吧，反正还报了软装也不是很感伤，咳，就，回见～（你们是最闪耀的天团～
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">阿比甲当嘎</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              各位老师们，通过这段时间的学习从一个小白到把自己家平面规划出来。首先很感激你们安排了这样的课程，让我有机会自己来diy。然后，整个课程的学习中也能感受到老师们对课程内容的用心，课后不管什么时候问问题，老师们都能耐心解答并且重视提出的每一个问题（不管是成熟的还是不成熟的）被我骚扰的最多的就是铁工老师了，哈哈。总之，通过这个课程收获满满，感恩各位老师！
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">cc</span><br /><span class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              很可惜户型改造课没有时间实时跟进课程，最后放假才慢慢补了课，一如既往干货满满收货很多。但我想实时跟进课程的效果应该会更好，所以很期待马上要开始的软装课。
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">童萌洁</span><br /><span class="cnt5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              很可惜户型改造课没有时间实时跟进课程，最后放假才慢慢补了课，一如既往干货满满收货很多。但我想实时跟进课程的效果应该会更好，所以很期待马上要开始的软装课。
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">童萌洁</span><br /><span class="cnt5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              说是顺利结束，可是马上又开始了~期待软装课，也谢谢老师给我在布局上的建议，上完软装课，我自己考完职称，在秋天开始的时候我就可以开始动工了呢，小学的时候就想过以后的梦想是做室内设计，那时家里刚有房子，第一次有自己的房间，我说想要粉色的房间，设计师帮我完成我的想法，我觉得他特别的酷，可惜后来自己没有朝这个职业方向走去，谢谢斗西的团队让我在毕业那么多年后，有了自己房子之后，有能力设计自己的家，自己小时候的梦想算是有一点点着落，再次感谢~
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">苏闽</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              说是顺利结束，可是马上又开始了~期待软装课，也谢谢老师给我在布局上的建议，上完软装课，我自己考完职称，在秋天开始的时候我就可以开始动工了呢，小学的时候就想过以后的梦想是做室内设计，那时家里刚有房子，第一次有自己的房间，我说想要粉色的房间，设计师帮我完成我的想法，我觉得他特别的酷，可惜后来自己没有朝这个职业方向走去，谢谢斗西的团队让我在毕业那么多年后，有了自己房子之后，有能力设计自己的家，自己小时候的梦想算是有一点点着落，再次感谢~
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">苏闽</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
          <slide class="feedback-subcontainer">
            <div class="feedback-comment">
              说是顺利结束，可是马上又开始了~期待软装课，也谢谢老师给我在布局上的建议，上完软装课，我自己考完职称，在秋天开始的时候我就可以开始动工了呢，小学的时候就想过以后的梦想是做室内设计，那时家里刚有房子，第一次有自己的房间，我说想要粉色的房间，设计师帮我完成我的想法，我觉得他特别的酷，可惜后来自己没有朝这个职业方向走去，谢谢斗西的团队让我在毕业那么多年后，有了自己房子之后，有能力设计自己的家，自己小时候的梦想算是有一点点着落，再次感谢~
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">苏闽</span><br /><span
                  class="page-font5"
                  >户型大改造·训练营一期班</span
                >
              </div>
              <img src="~/images/home/user.png" />
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="product-section">
      <div class="product-flex container-1180">
        <div class="product-left">
          <img lass="product-logo" src="~/images/home/logo.svg" />
          <div class="product-text">
            <span>每个人都能拥有好设计<br />家装领域“价值观”驱动平台</span>
            <div class="product-weixin">
              <img class="product-wechat" src="~/images/home/wechat.svg" /><img
                class="product-qr"
                src="~/images/home/QRcode.svg"
              />&nbsp;&nbsp;&nbsp;<img src="~/images/home/email.svg" />
            </div>
          </div>
        </div>
        <div class="product-right">
          <div class="product-container2">
            <span class="product-title">设计教育</span
            ><span class="product-text"
              >平面布局训练营<br />“超”软装设计训练营<br />斗西家宝典</span
            >
          </div>
          <div class="product-container3">
            <span class="product-title">更多产品</span
            ><span class="product-text">daylab</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sofaSVG from "images/home/sofa.svg";
import chairSVG from "images/home/chair.svg";
import cabinetSVG from "images/home/cabinet.svg";
import tableSVG from "images/home/table.svg";
import bedSVG from "images/home/bed.svg";
import huxingPNG from "images/home/huxing.png";
import moxingPNG from "images/home/moxing.png";
import yusuanPNG from "images/home/yusuan.png";
import qingdanPNG from "images/home/qingdan.png";

export default {
  data() {
    return {
      imgindex: "0",
      imagesUrl: [sofaSVG, chairSVG, cabinetSVG, tableSVG, bedSVG],
      timer: "",

      plangoIndex: "0",
      plangoUrl: [huxingPNG, moxingPNG, yusuanPNG, qingdanPNG],

      prizeindex: null,

      isBig: "prize-scale",
      isSmall: "prize-img"
    };
  },

  //
  created() {
    (this.timer = setInterval(this.handleNext.bind(this), 1000)),
      this.handleChangeplangoIndex(0);
  },

  methods: {
    handleNext() {
      if (this.imgindex == this.imagesUrl.length - 1) {
        this.imgindex = 0;
      } else {
        this.imgindex++;
      }
    },

    handleChangeplangoIndex(index) {
      this.plangoIndex = index;
    },

    handleChangePrizeIndex(index) {
      this.prizeindex = index;
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  cursor: default;
}

.page-body {
  display: block;

  background-color: white;
}

.container-1180 {
  width: 1180px;
  margin: 0 auto;
}

.slogan-section {
  margin-top: 70px;
}

.slogan-content {
  margin-bottom: 70px;
}

.slogan-content-hd {
  display: flex;
  justify-content: space-between;
}

.slogan-left {
  display: inline-block;
  width: 600px;
  height: 161px;
  vertical-align: middle;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 78px;
  /* identical to box height, or 100% */
  letter-spacing: 0.01em;
  /* Font/gray-dark */
  color: #2c3330;
}

.slogan-down {
  height: 80px;
  display: flex;
}

.slogan-container {
  display: inline-block;
  color: #14af64;
  line-height: 80px;
  border-bottom: 8px solid #14af64;
  padding-bottom: 3px;
  height: 95px;
}

.slogan-middle {
  display: inline-flex;
  height: 160px;
  padding-left: 34px;
  margin-left: 100px;
  border-left: 2px solid;
  align-items: center;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 42px;
  /* identical to box height, or 112% */
  /* Font/gray-dark */
  color: #2c3330;
}

.slogan-right {
  align-items: center;
  position: relative;
  width: 160px;
  height: 160px;
}

.slogan-circle {
  position: relative;
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}

.slogan-icon {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 30%;
  left: 30%;
}

.slogan-img {
  width: 1180px;
  height: 700px;
  margin-top: 84px;
  margin-bottom: 120px;
}

.people-title {
  text-align: center;
  margin-bottom: 72px;
}

.page-font1 {
  display: block;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 62px;
  /* identical to box height, or 129% */
  /* Font/gray-dark */
  color: #2c3330;
}

.people-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 19px 0;
}

.people-space {
  margin: 0 333px;
}

.page-font2 {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 133% */
  /* Font/gray */
  color: #606c66;
}

.page-font3 {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
  /* identical to box height, or 133% */
  /* Font/gray-dark */
  color: #2c3330;
}

.page-font4 {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  /* Font/gray-dark */
  color: #2c3330;
}

.page-font5 {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  /* Font/gray2 */
  color: #81948b;
}

.course-left {
  margin-left: 40px;
}

.course-right {
  margin-top: 128px;
  margin-bottom: 31px;
  float: right;
  display: flex;
  align-items: center;
}

.course-list {
  margin-top: 120px;
  margin-bottom: 31px;
  display: inline-flex;
  align-items: center;
}

.course-content {
  display: flex;
  justify-content: space-between;
}

.course-text {
  padding: 17px;
}

.course-free {
  width: 280px;
  height: 318px;
  border: 1px solid #efefef;
  box-sizing: border-box;
}

.course-free:hover {
  width: 280px;
  height: 318px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.course-ft {
  display: flex;
  justify-content: space-between;
}

.course-freeimage {
  width: 278px;
  height: 156px;
}

.course-chargeimage {
  width: 378px;
  height: 224px;
}

.course-title {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */
  /* Font/gray-dark */
  color: #2c3330;
}

.course-length {
  margin-top: 8px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  /* Font/gray-light */
  color: #8ea098;
  display: flex;
  align-items: center;
}

.course-price {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  /* Brand/Green */
  color: #14af64;
}

.course-price1 {
  margin-top: 24px;
}

.course-price2 {
  margin-top: 16px;
  display: inline-block;
}

.course-price3 {
  margin-left: 4px;
  margin-bottom: 17px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  text-decoration-line: line-through;

  /* Font/gray-light */

  color: #8ea098;
}

.course-invisibile {
  visibility: hidden;
  display: flex;
  align-items: flex-start;
}

.prize-indisplay {
  display: none;
}

.course-charge {
  width: 380px;
  height: 354px;
  border: 1px solid #efefef;
  box-sizing: border-box;
}

.course-charge:hover {
  width: 380px;
  height: 354px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.course-charge:hover .course-invisibile {
  visibility: visible;
}

.course-free:hover .course-invisibile {
  visibility: visible;
}

.course-xueshe {
  width: 204px;
  margin: 80px auto;
  padding: 16px 48px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  /* Font/gray-dark */
  color: #2c3330;
  border: 1px solid #2c3330;
  box-sizing: border-box;
}

.course-xueshe:hover {
  width: 204px;
  margin: 80px auto;
  padding: 16px 48px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  /* Font/gray-dark */
  color: white;
  border: 1px solid #2c3330;
  box-sizing: border-box;
  background-color: #2c3330;
  cursor: pointer;
}

.plango {
  text-align: center;
  margin: 70px auto;
}

.plango-title {
  margin: 0px auto 16px auto;
}

.plango-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plango-img {
  position: relative;
  width: 779px;
  height: 496px;
  display: inline-block;
}

.plango-sub {
  width: 379px;
  height: 84px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.plango-hoversub {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height */

  /* Font/gray */

  color: #606c66;
  margin-left: 12px;
}

.plango-subcontainer {
  width: 200px;
}

.plango-text {
  display: inline;
  float: right;
}

.plango-subtext {
  margin-left: 12px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  /* identical to box height, or 160% */
  /* Font/gray-dark */
  color: #2c3330;
  display: block;
}

.plango-grey {
  filter: grayscale(1) opacity(0.6);
}

.plango-subwidth {
  width: 200px;
}

.prize-padding {
  padding-top: 80px;
  padding-bottom: 0px;
}

.prize {
  display: flex;
  align-items: center;
}

.prize-text {
  width: 590px;
  display: inline;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  font-weight: 400;
  line-height: 64px;
  /* identical to box height, or 100% */
  /* Font/gray */
  color: #606c66;
}

.prize-sel {
  display: flex;
  align-items: center;
}

.prize-sel:hover {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 64px;
  /* identical to box height, or 100% */

  /* Font/gray-dark */

  color: #2c3330;
}

.prize-container {
  width: 425px;
  height: 425px;
  position: relative;
}

.prize-position1 {
  position: absolute;
}

.prize-position2 {
  position: absolute;
  left: 220px;
}

.prize-position3 {
  position: absolute;
  top: 220px;
}

.prize-position4 {
  position: absolute;
  left: 220px;
  top: 220px;
}

.prize-img {
  width: 150px;
  height: 150px;
}

.prize-scale {
  width: 150px;
  height: 150px;
  transform: scale(1.5);
  transition: transform 0.2s;
}

.prize-sel:hover .prize-indisplay {
  display: inline;
}

.feedback {
  text-align: center;
  margin: 100px auto 72px auto;
}

.feedback-content {
  position: relative;
  margin: 0 auto;
  height: 500px;
}

.feedback-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 550px;
  cursor: grab;
}

.feedback-subcontainer {
  width: 382px;
  // margin: 0px 10px;
  cursor: grab;
  margin: 0px 10px;
}

.feedback-comment {
  width: 332px;
  padding: 24px;
  font-family: Source Han Sans SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */
  letter-spacing: 1px;
  /* Font/gray-dark */
  color: #2c3330;
  border: 1px solid #efefef;
  background: #fafafa;
  display: inline-block;
  cursor: grab;
}

.feedback-triangle1 {
  float: right;
  width: 0;
  height: 0;
  border-top: 16px solid#EFEFEF;
  border-left: 16px solid transparent;
}

.feedback-triangle2 {
  position: relative;
  top: -1px;
  left: 316px;
  width: 0;
  height: 0;
  border-top: 15px solid #fafafa;
  border-left: 15px solid transparent;
}

.feedback-user {
  margin-top: 17px;
  text-align: right;
}

.feedback-username {
  margin-right: 16px;
  display: inline-block;
}

.product-section {
  height: 330px;
  padding-top: 80px;
  background: #fafafa;
  display: flex;
  justify-content: center;
}

.product-text {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  display: inline-block;
  margin-bottom: 22px;
  /* identical to box height */
  /* Font/gray */
  color: #606c66;
  opacity: 0.8;
}

.product-left {
  width: 170px;
  display: inline-block;
}

.product-right {
  display: inline-flex;
  align-items: flex-start;
}

.product-flex {
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
}

.product-logo {
  width: 145px;
  height: 34px;
  margin-bottom: 16px;
}

.product-container2 {
  text-align: left;
  display: inline-block;
}

.product-container3 {
  margin-left: 72px;
  text-align: left;
  display: inline-block;
}

.product-title {
  display: block;
  margin-bottom: 24px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  /* identical to box height */
  /* Font/gray-dark */
  color: #2c3330;
}

.product-weixin {
  margin-top: 42px;
  position: relative;
}

.product-wechat {
  &:hover {
    .product-qr {
      visibility: visible;
    }
  }
}

.product-qr {
  visibility: hidden;
  position: absolute;
  left: -58px;
  top: -170px;
}

.page-footer {
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 57px;
  border-top: 1px solid rgba(44, 51, 48, 0.1);
  background: #fafafa;
}

.footer-endtext {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  /* identical to box height */
  /* Font/gray-dark */
  color: #2c3330;
  opacity: 0.6;
}
</style>
