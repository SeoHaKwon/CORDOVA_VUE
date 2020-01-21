<template>
  <div class="wrap">
    <div class="header">
      <a href="#" class="btn-link"></a>
      <strong>약관동의</strong>
    </div>
    <div class="content">
    <div class="check-section">
      <div class="all">
        <p class="check-box">
          <input type="checkbox" v-model="allAgree" v-on:click="allAgreeClick">
          <span>전체동의</span>
        </p>
      </div>
        <p class="check-box">
          <input type="checkbox" v-model="serviceAgree">
          <span>(필수) 이용약관</span>
          <button class="btn-view" v-on:click="popOpen(0)">보기</button>
        </p>
        <p class="check-box">
          <input type="checkbox" v-model="infoAgree">
          <span>(필수) 개인정보 수집 및 이용 안내</span>
          <button class="btn-view" v-on:click="popOpen(1)">보기</button>
        </p>
        <p class="check-box">
          <input type="checkbox" v-model="giveAgree">
          <span>(필수) 제 3자 제공동의</span>
          <button class="btn-view" v-on:click="popOpen(2)">보기</button>
        </p>
    </div>
    </div>
    <a href="#" class="btn-bottom" v-on:click="nextStep" :style="{'background-color': mcolor}">
      동의하기
    </a>
    <div class="pop" v-bind:class="{ active: IsPop }"> <!--active 클래스 추가시 활성화됩니다.-->
      <div class="pop-cont">
        <div class="pop-header">
          <strong>{{ dataList[selNum].title }}</strong>
          <button type="button" class="pop-close" v-on:click="popClose"></button>
        </div>
        <div class="pop-inner">
          <h2 class="title">{{ dataList[selNum].title }}</h2>
          <!-- <p class="tit">제 1장 총칙</p> -->
          <div class="desc" v-if="dataList[selNum].subtitle" v-html="dataList[selNum].subtitle"/>
          <div class="desc">
            <div v-for="(item, idx) in dataList[selNum].zo" v-bind:key="idx">
            <strong class="num">{{ item.subtitle }}</strong>
              <p v-html="item.desc"/>
            </div>
            <p v-if="dataList[selNum].bottomData" v-html="dataList[selNum].bottomData"/>
          </div>
        </div>
      </div>
    </div>
    <div class="pop2" v-bind:class="{ active: IsPop }"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FirstPage',
  data: () => {
    return {
      mcolor: '#D1D1D6',
      IsPop: false,
      selNum: 1,
      isNext: false,
      allAgree: false,
      serviceAgree: false,
      infoAgree: false,
      giveAgree: false,
      userInfo: '',
      dataList: [
        {
          'title': '서비스 이용약관',
          'zo': [
            {
              'subtitle': '제 1조 (목적)',
              'desc': `<p>본 약관은 주식회사 LG디스플레이(이하 "회사"라 합니다)가 IR Page를 (이하 "IR전용 모바일 어플리케이션"이라 합니다) 통하여 제공하는 서비스(이하 "서비스"라 합니다)를 이용함에 있어 이용자와 "회사"의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p><p>본 약관에 정하는 이외의 "이용자"와 "회사"의 권리, 의무 및 책임사항에 관해서는 전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다.</p>`
            },
            {
              'subtitle': '제 2조 (이용자의 정의)',
              'desc': `<p>"이용자"란 " IR전용 모바일 어플리케이션"에 접속하여 "회사"가 제공하는 서비스를 받는 자를 말합니다.</p>`
            },
            {
              'subtitle': '제 3조 (회원 가입)',
              'desc': `<p>1. "회원"이 되고자 하는 자는 "회사"가 정한 가입 양식에 따라 개인 정보를 기입하고&nbsp;</p>
                        <p>등록하기" 단추를 누르는 방법으로 회원 가입을 신청합니다.</p>
                        <p>2.<span style="white-space:pre"></span>"회사"는 제1항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청한 자를 회원으로 등록합니다.</p>
                        <p>1) 등록 내용에 허위, 기재누락, 오기가 있는 경우.</p>
                        <p>2) 기타 회원으로 등록하는 것이 "회사"의 기술상 현저히 지장이 있다고 판단되는 경우</p>`
            },
            {
              'subtitle': '제 4조 (서비스의 제공 및 변경)',
              'desc': `<p>1.<span style="white-space:pre"></span>"이용자"에게 아래와 같은 서비스를 제공합니다</p>
                        <p>1)<span style="white-space:pre"></span>IR일정</p>
                        <p>2)<span style="white-space:pre"></span>실적발표 및 FAQ</p>
                        <p>3)<span style="white-space:pre"></span>IR News</p>
                        <p>4)<span style="white-space:pre"></span>경영보고서</p>
                        <p>5)<span style="white-space:pre"></span>재무정보</p>
                        <p>6)<span style="white-space:pre"></span>주주현황 및 배당내역</p>
                        <p>7)<span style="white-space:pre"></span>IR Contact</p>
                        <p>8)<span style="white-space:pre"></span>기타 "회사"가 자체 개발하거나 다른 회사와의 협력 계약 등을 통해 이용자"들에게 제공할 일체의 서비스</p>
                        <p>2.<span style="white-space:pre"></span>제1항의 서비스는 "회원가입" 절차를 마친 후 이용 가능합니다.</p>
                        <p>3.<span style="white-space:pre"></span>"회사"는 그 변경될 서비스의 내용 및 제공 일자를 제7조 제2항에서 정한 방법으로 "이용자"에게 통지하고, 제1항에 정한 서비스를 변경하여 제공할 수 있습니다.</p>
                        `
            },
            {
              'subtitle': '제 5조 (서비스의 중단)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체, 기타 "회사"가 적절하다고 판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.</p>
                        <p>2.<span style="white-space:pre"></span>제1항에 의한 서비스 중단의 경우에는 "회사"는 제7조 제2항에서 정한 방법으로 이용자에게 통지합니다. 다만, "회사"가 통제할 수 없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.</p>
                        `
            },
            {
              'subtitle': '제 6조 (이용자 탈퇴 및 자격 상실 등)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회원"은 "회사"에 언제든지 자신의 회원 등록을 말소해 줄 것(회원 탈퇴)을 요청할 수 있으며 "회사"는 위 요청을 받은 즉시 해당 "회원"의 등록 말소를 위한 절차를 밟습니다.</p>
                      <p>2.<span style="white-space:pre"></span>"회원"이 다음 각 호의 사유에 해당하는 경우, "회사"는 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.</p>
                      <p>1)<span style="white-space:pre"></span>가입 신청 시에 허위 내용을 등록한 경우</p>
                      <p>2)<span style="white-space:pre"></span>다른 사람의 "서비스" 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우</p>
                      <p>3)<span style="white-space:pre"></span>"서비스"를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</p>
                      <p>3.<span style="white-space:pre"></span>"회사"가 회원자격을 상실시키기로 결정한 경우에는 회원등록을 말소합니다. 이 경우 "회원"에게 회원등록 말소 전에 이를 통지하고, 소명할 기회를 부여합니다.</p>
                      `
            },
            {
              'subtitle': '제 7조 (이용자에 대한 통지)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"가 특정 이용자에 대해 통지를 하는 경우 "이용자"가 회원 가입 시 제공한 메일주소로 할 수 있습니다.</p>
                      <p>2.<span style="white-space:pre"></span>"회사"가 불특정 다수 이용자에 대해 통지를 하는 경우 " IR전용 모바일 어플리케이션" 게시판 게시 또는 푸시알림 메시지를 전송함으로써 개별 통지에 갈음할 수 있습니다.</p>
                      `
            },
            {
              'subtitle': '제 8조 (이용자의 개인정보보호)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"는 관련 법령이 정하는 바에 따라서 이용자 등록정보를 포함한 "이용자"의 개인정보를 보호하기 위하여 노력합니다. "이용자"의 개인정보보호에 관해서는 관련 법령 및 "회사"가 정하는 "개인정보 취급방침"에 정한 바에 의합니다.</p>`
            },
            {
              'subtitle': '제 9조 (이용자에 대한 통지)',
              'desc': `<p>1. “회사”가 “이용자”에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 “이용자”가 제공한 전자우편주소, (휴대)전화번호, “서비스” 로그인 시 동의 창 등의 수단으로 통지할 수 있습니다.</p>
                        <p>2. “이용자”는 “회사”에 실제로 연락이 가능한 전자우편, (휴대)전화번호 등의 정보를 제공하고 해당 정보들을 최신으로 유지하여야 하며 “회사”의 통지를 확인하여야 합니다.</p>
                        <p>3. 이용자정보가 변경되었음에도 해당 사항을 수정하지 않음으로써 발생한 각종 손해와 잘못된 수정으로 인하여 발생한 손해는 당해 이용자가 부담하여야 하며, 회사는 이에 대하여 아무런 책임을 지지 않습니다</p>`
            },
            {
              'subtitle': '제 10조 (회사의 의무)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하기 위해서 노력합니다.</p>
                        <p>2.<span style="white-space:pre"></span>"회사"는 "이용자"가 안전하게 서비스를 이용할 수 있도록 "이용자"의 개인정보보호를 위한 보안시스템을 구축합니다.</p>
                        <p>3.<span style="white-space:pre"></span>"회사"는 "이용자"가 원하지 않는 영리 목적의 광고성 전자우편을 발송하지 않습니다.</p>`
            },
            {
              'subtitle': '제 11조 (이용자의 의무)',
              'desc': `<p>1.<span style="white-space:pre"></span>이용자는 다음 각 호의 행위를 하여서는 안됩니다.</p>
                        <p>1) 회원가입신청시 허위내용을 등록하는 행위</p>
                        <p>2) “회사”, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위</p>
                        <p>3) 정크메일(junk mail), 스팸메일(spam mail), 행운의 편지(chain letters), 피라미드 조직에 가입할 것을 권유하는 메일, 외설 또는 폭력적인 메시지·화상·음성 등이 담긴 메일을 보내거나 기타 공서양속에 반하는 정보 또는 문의를 회사에 전달하는 행위</p>
                        <p>4) 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)를 회사에 전달하는 행위</p>
                        <p>5) "회사"의 직원이나 서비스의 관리자를 가장하거나 사칭하여 또는 타인의 명의를 도용하여 회사에 정보 또는 문의를 전달하는 행위</p>
                        <p>6) 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 회사에 전달하는 행위</p>
                        <p>7) 다른 이용자에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위</p>
                        <p>8) "회사"가 제공하는 서비스에 정한 약관, 기타 서비스 이용에 관한 규정을 위반하는 행위</p>
                        <p>2.<span style="white-space:pre"></span>제1항에 해당하는 행위를 한 "이용자"가 있을 경우 "회사"는 본 약관 제6조 제2, 3항에서 정한 바에 따라 "이용자"의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.</p>
                        <p>3.<span style="white-space:pre"></span>"이용자"는 그 귀책사유로 인하여 "회사"나 다른 "이용자"가 입은 손해를 배상할 책임이 있습니다.</p>`
            },
            {
              'subtitle': '제 12조 (문의하기 글 삭제)',
              'desc': `<p>"이용자"는 문의하기를 통해 회사에 전달한 내용이 다음 각 호에 해당하는 경우 "회사"는 "이용자"에게 사전 통지 없이 해당 내용을 삭제할 수 있고, 해당 "이용자"의 회원 자격을 제한, 정지 또는 상실시킬 수 있습니다.</p>
                        <p>1.<span style="white-space:pre"></span>다른 이용자 또는 제3자를 비방하거나 중상모략으로 명예를 손상하는 내용</p>
                        <p>2.<span style="white-space:pre"></span>공서양속에 위반되는 내용의 정보, 문장, 도형 등을 유포하는 내용</p>
                        <p>3.<span style="white-space:pre"></span>범죄행위와 관련이 있다고 판단되는 내용</p>
                        <p>4.<span style="white-space:pre"></span>다른 이용자 또는 제3자의 저작권 등 기타 권리를 침해하는 내용</p>
                        <p>5.<span style="white-space:pre"></span>기타 관계 법령에 위배된다고 판단되는 내용</p>`
            },
            {
              'subtitle': '제 13조 (문의하기 답변 기준 / 제재조치)',
              'desc': `<p>'정보 통신 윤리 위원회 규칙'을 기본 원칙으로 하며 다음과 같은 내용의 글에는 답변하지 않습니다.</p>
                        <p>1.<span style="white-space:pre"></span>현행법을 어기고 공공질서, 미풍양속을 저해하는 내용의 게시물</p>
                        <p>1)<span style="white-space:pre"></span>국가이념과 국가의 존립을 훼손하고 반국가적 행위의 수행을 목적으로 하는 내용</p>
                        <p>2)<span style="white-space:pre"></span>타인 또는 타 단체의 권리를 침해하거나 명예를 훼손하는 내용</p>
                        <p>3)<span style="white-space:pre"></span>사회적 혼란을 야기시키는 허위 사실인 내용</p>
                        <p>4)<span style="white-space:pre"></span>개인의 사생활을 침해하는 내용</p>
                        <p>5)<span style="white-space:pre"></span>인명을 경시하고 폭력성이 짙은 내용 및 범죄 혹은 비행행위를 찬미, 조장하는 내용</p>
                        <p>6)<span style="white-space:pre"></span>범죄행위의 구체적인 방법을 묘사하여 모방 범죄를 유발하게 하는 내용</p>
                        <p>7)<span style="white-space:pre"></span>보는 이에게 혐오감을 유발할 내용과 정보</p>
                        <p>8)<span style="white-space:pre"></span>성적인 욕구를 지나치게 자극하거나 혐오감을 주는 음란한 내용</p>
                        <p>9)<span style="white-space:pre"></span>불륜관계, 근친상간 등 패륜적, 반인류적 성행위를 자세하게 소개하거나 흥미 위주로 묘사한 내용</p>
                        <p>10)<span style="white-space:pre"></span>성폭력, 강간, 윤간 등 성범죄를 구체적, 사실적으로 묘사하거나 미화한 내용</p>
                        <p>11)<span style="white-space:pre"></span>성을 상품화하거나 특정 신체 부위를 지나치게 노출 및 언급한 내용</p>
                        <p>12)<span style="white-space:pre"></span>욕설 또는 언어폭력 등의 저속한 표현으로 타인의 인격을 모독하거나 불쾌감 또 혐오감을 불러일으키는 내용</p>
                        <p>13)<span style="white-space:pre"></span>특정 종교 간의 감정 대립을 조장하는 내용</p>
                        <p>14)<span style="white-space:pre"></span>미신 또는 비과학적인 생활 태도를 조장하는 내용</p>
                        <p>2.<span style="white-space:pre"></span>적절하지 못한 내용을 담은 글</p>
                        <p>1)<span style="white-space:pre"></span>스팸성 글(저주성 글, 행운의 편지 등)</p>
                        <p>2)<span style="white-space:pre"></span>특정 개인 신상 정보 노출로 인해 피해가 예상되는 경우</p>
                        <p>3)<span style="white-space:pre"></span>근거 없는 내용을 게재함으로 인해 개인, 특히 공인의 사생활침해 및 명예 훼손의 소지가 있는 경우</p>
                        <p>4)<span style="white-space:pre"></span>문의하기 내용이 서비스 성격에 위배되거나 동일한 내용을 여러 게시판에 등록한 경우</p>
                        <p>5)<span style="white-space:pre"></span>지나치게 무성의, 무의미한 내용의 게시물</p>
                        <p>6)<span style="white-space:pre"></span>버그 현상으로 인해 화면상에서 그 내용을 확인할 수 없는 게시물</p>
                        <p>7)<span style="white-space:pre"></span>매춘, 사이버 섹스, 노골적인 성적 대화 등 성적 유희 대상을 찾거나 매개하는 내용</p>
                        <p>8)<span style="white-space:pre"></span> 음란 정보 또는 퇴폐업소가 있는 장소를 안내 또는 매개하는 내용</p>
                        <p>9)<span style="white-space:pre"></span> 특정 이용자, 개인을 감정적으로 비난하고 분쟁을 유도하는 내용의 게시물</p>
                        <p>10)<span style="white-space:pre"></span> 의료, 기구, 약품, 건강 보조 식품 등을 과장되게 소개하여 오용 또는 남용을 조장하는 내용을 담은 게시물</p>
                        <p>11)<span style="white-space:pre"></span> 출처가 불분명한 인용문(일명 가져온 글) 및 게시자가 책임지지 못하는 정보 및 주장을 담은 게시물</p>
                        <p>12)<span style="white-space:pre"></span> 정보통신설비의 오동작이나 정보 등의 파괴 및 혼란을 유발하는 컴퓨터 바이러스 감염자료를 등록 또는 유포하는 행위</p>
                        <p>3.<span style="white-space:pre"></span>저작권에 위반되는 내용의 게시물</p>
                        <p>1)<span style="white-space:pre"></span>상용 프로그램의 등록과 게재, 배포를 안내하는 내용</p>
                        <p>2)<span style="white-space:pre"></span>정품 확인이 안 되는 소프트웨어, 각종 저작물의 유통을 담은 내용</p>
                        <p>3)<span style="white-space:pre"></span>타인의 권리에 속하는 저작권, 상표권, 의장권 등을 무단으로 침해하는 내용</p>
                        <p>4.<span style="white-space:pre"></span>온라인 판매/구매/돈 벌기 관련 게재 금지 게시물</p>
                        <p>1)<span style="white-space:pre"></span>돈 벌기 사이트 관련 게시물</p>
                        <p>2)<span style="white-space:pre"></span>특정 사이트 및 제품에 대한 직접적인 홍보 및 간접 홍보의 내용</p>
                        <p>3)<span style="white-space:pre"></span>불법 게임, 소프트웨어, 음반, 영상의 복사 및 판매(백업CD 포함)의 내용</p>
                        <p>4)<span style="white-space:pre"></span>음란, 폭력물을 판매할 목적으로 선전하는 내용</p>
                        <p>5)<span style="white-space:pre"></span>미풍양속을 위반하고 사행심을 조장하는 영상 및 저작물</p>
                        <p>5.<span style="white-space:pre"></span>기타</p>
                        <p>1)<span style="white-space:pre"></span>타인의 아이디를 도용해 부정하게 사용하는 경우</p>
                        <p>2)<span style="white-space:pre"></span>"회사"의 정상적인 경영활동 및 서비스를 방해하고 회사 이익에 막대한 지장과 해악을 미친다고 판단되는 게시물</p>
                        <p>이상의 내용에 저촉되는 문의하기 내용 등에 대해서는 사전 통지 없이 임의 삭제될 수 있으며 위반사항이 거듭되거나 위반으로 인한 피해가 극심하다고 판단되는 경우, "이용자"를 경고 또는 이용 중지 처리할 수 있습니다.</p>`
            },
            {
              'subtitle': '제 14조 (저작권의 귀속 및 이용제한',
              'desc': `<p>1.<span style="white-space:pre"></span>"서비스"와 관련한 자산은 저작권, 상표권, 기술에 대한 정보, 텍스트, 그래픽, 오디오, 비디오, 다운로드, 링크, 그리고 소스 코드 (이하 IR전용 App 서비스)이며, "회사"는"서비스" 대해 모든 권리를 가지고 있습니다. 모든 형태의 정보는 "이용자" 여러분들을 위한 것이며, 여러분들의 편의를 위해 제공되는 것입니다. 그러나, "회사"는 이러한 정보에 대한 상업적 사용권을 허락하는 것은 아님을 밝혀드립니다. "이용자"는 개인적인 용도가 아닌 어떠한 경우에도 이 "서비스"를 사용할 수 없습니다.</p>
                        <p>2.<span style="white-space:pre"></span>이용자는 "서비스"를 이용함으로써 얻은 정보를 "회사"의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</p>`
            },
            {
              'subtitle': '제 15조 (면책)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"는 "이용자"가 "서비스"를 이용함으로써 기대되는 수익을 얻지 못하거나 "서비스"를 통해 얻은 자료를 이용하여 발생한 손해에 대해서는 책임을 부담하지 않습니다.</p>
                        <p>2.<span style="white-space:pre"></span>"서비스"를 통해 제공되는 정보나 자료들은 증권거래에 관련된 기구들의 요구 조건을 충족시키지 못함을 알려드립니다. 그러므로, 이러한 정보나 자료 등을 참조해 투자 결정을 내리지 마시기를 부탁드립니다. 이에 대해 "회사"는 명시적으로 이들 정보나 자료 등에 대해 상업, 금융 정보로서 정확성, 신뢰성에 대해 어떠한 보증도 할 수 없음을 알려드립니다.</p>
                        <p>3.<span style="white-space:pre"></span>"회사"는 자체적인 기준에 의거해 다양한 형태의 파일과 링크를 제공하고 있습니다. 제공된 파일과 링크는 모두 "이용자"들의 정보획득과 편의를 위해 제공하고 있으나 파일과 링크에 대한 어떤 법적 책임도 "회사"에는 있지 않으며 신뢰성에 대한 보장을 "회사"가 하지는 않습니다. 각 파일과 링크는 "이용자" 여러분께서 판단하시어 효율적으로 이용하시기 바랍니다.</p>
                        <p>4.<span style="white-space:pre"></span>"이용자"가 화면에 게재한 정보, 자료, 사실 등의 내용에 관한 신뢰도 또는 정확성에 대하여는 해당 "이용자"가 책임을 부담하며, "회사"는 내용의 부정확 또는 허위로 인해 "이용자" 또는 제3자에게 발생한 손해에 대하여는 아무런 책임을 부담하지 않습니다.</p>
                        <p>5.<span style="white-space:pre"></span>"회사"는 "서비스" 이용과 관련하여 "이용자"의 고의 또는 과실로 인하여 "이용자" 또는 제3자에게 발생한 손해에 대하여는 아무런 책임을 부담하지 않습니다.</p>`
            },
            {
              'subtitle': '제 16조 (약관의 개정)',
              'desc': `<p>1.<span style="white-space:pre"></span>"회사"는 약관의 규제 등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
                        <p>2.<span style="white-space:pre"></span>"회사"가 본 약관을 개정할 경우에는 적용 일자 및 개정 사유를 명시하여 현행약관과 함께 초기화면에 그 적용 일자 칠(7)일 이전부터 적용 일자 전일까지 공지합니다.</p>
                        <p>3.<span style="white-space:pre"></span>"이용자"는 변경된 약관에 대해 거부할 권리가 있습니다. "이용자"는 변경된 약관이 공지된 후 십오(15)일 이내에 거부 의사를 표명할 수 있습니다. "이용자"가 거부하는 경우 "회사"는 당해 "이용자"와의 계약을 해지할 수 있습니다. 만약 "이용자"가 변경된 약관이 공지된 후 십오(15)일 이내에 거부 의사를 표시하지 않는 경우에는 동의하는 것으로 간주합니다.</p>`
            },
            {
              'subtitle': '제 17조 (준거법 및 재판관할)',
              'desc': `<p>1.&nbsp; “회사”와 “이용자”간 제기된 소송은 대한민국법을 준거법으로 합니다.</p>
                        <p>2.&nbsp; “회사”와 “이용자” 간 발생한 분쟁에 관한 소송은 제소 당시의 “이용자”의 주소에 의하고, 주소가 없는 경우 거소를 관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 “이용자”의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</p><br><br>`
            }
          ],
          'bottomData': `<p>부칙</p>
                          <p>본 약관은 2020년 00월 00일부터 적용됩니다.</p>
                          <p>2020년 00월 00일부터 시행되던 종전의 약관은 본 약관으로 대체합니다</p>
                          <p><br /></p>
                          `
        },
        {
          'title': '개인정보 처리 방침',
          'subtitle': `<p style="font-size:12px;">개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 통신비밀보호법, 전기통신사업법 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.</p>
                        <p style="font-size:12px;">회사의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</p>
                        <p>
                          <br />
                        </p>`,
          'zo': [
            {
              'subtitle': `1. 처리하는 개인정보 항목`,
              'desc': `<p>회사는 IR정보 제공 및 기관투자자 미팅접수를 위하여 아래와 같은 개인정보를 수집하고 있습니다.</p>
                        <p>- 필수정보</p>
                        <p>1) IR정보 제공 : 성명, 생년월일, 성별, 내외국인여부, 이통사정보, 휴대폰번호, DI</p>
                        <p>휴대폰번호는 나이스평가정보에서 인증 받은 휴대폰 번호를 사용 하고 있습니다.</p>
                        <p>2) 기관투자자 미팅 신청 접수 : 신청인 및 방문자(동행인) 정보(회사명, 이름, 직책, 이메일, 연락처)</p>
                        <p>
                          <br />
                        </p>
                        <p>그리고 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.</p>
                        <p>- 이용자의 브라우저 종류 및 OS, 방문 기록(IP Address, 접속시간), 쿠키</p>
                        <p>
                          <br />
                        </p>
                        <p>회사는 IR전용 App을 통한 사용자 입력 방법으로 개인정보를 수집하며, 경우에 따라 출력된 형태의 종이문서 혹은 이메일로 일부 정보를 수집할 수도 있습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `2. 개인정보의 처리목적`,
              'desc': `<p>모든 투자자들에 대한 IR정보 제공 및 기관투자자 미팅신청에 따른 본인확인 및 원활한 의사소통 경로 확보</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `3. 개인정보의 제3자 제공`,
              'desc': `<p>회사는 개인정보를 "2. 개인정보의 처리목적"에서 고지한 범위내에서 사용하며, 정보주체의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>- 정보주체가 사전에 동의한 경우</p>
                        <p>- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `4. 개인정보 처리의 위탁`,
              'desc': `<p>회사는 원활한 업무 처리를 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따른 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.</p>
                        <p>회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>수탁업체<span style="white-space:pre"></span>위탁업무내용<span style="white-space:pre"></span>개인정보의 보유 및 이용기간</p>
                        <p>IR큐더스<span style="white-space:pre"></span>- IR전용 App의 개발 및 유지보수</p>
                        <p>- 시스템 운영 및 관리<span style="white-space:pre"></span>업무목적 달성시 까지</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `5. 개인정보의 처리 및 보유기간`,
              'desc': `<p>정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유/이용 기간 내에서 개인정보를 처리 및 보유하며, 원칙적으로 개인정보의 처리목적이 달성되면 지체 없이 파기합니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `6. 개인정보 파기절차 및 방법`,
              'desc': `<p>개인정보는 원칙적으로 개인정보의 처리목적이 달성되면 지체 없이 파기합니다. 회사의 개인정보 파기절차 및 방법은 다음과 같습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>가. 파기절차</p>
                        <p>- 정보주체가 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 보관사유에 따라("5. 개인정보의 처리 및 보유기간" 참조)일정 기간 저장된 후 파기됩니다.</p>
                        <p>- 동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>나. 파기방법</p>
                        <p>- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
                        <p>- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `7. 정보주체의 권리·의무 및 그 행사방법`,
              'desc': `<p>정보주체는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 정보삭제 및 처리정지를 요청할 수도 있습니다. 정보삭제 또는 처리정지를 원하시는 경우 개인정보보호 책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `8. 개인정보의 안전성 확보조치`,
              'desc': `<p>회사는 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 보호조치를 강구하고 있습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>가. 비밀번호 암호화</p>
                        <p>IR전용 App을 이용하면서 설정한 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>나. 해킹 등에 대비한 대책</p>
                        <p>회사는 해킹이나 컴퓨터 바이러스 등에 의해 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>다. 개인정보보호전담기구의 운영</p>
                        <p>사내 개인정보보호전담기구 등을 통하여 회사의 개인정보처리방침 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다. 단, 회사가 개인정보보호 의무를 다 하였음에도 불구하고 이용자 본인의 부주의나 회사가 관리하지 않는 영역에서의 사고 등 회사의 귀책에 기인하지 않은 손해에 대해서는 회사는 책임을 지지 않습니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `9. 개인정보보호 책임자 및 연락처`,
              'desc': `<p>귀하께서는 IR전용 App을 이용하시는 과정에서 발생하는 모든 개인정보보호 관련 민원을 개인정보보호 책임자에게 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>개인정보보호 책임자</p>
                        <p>이 름 : 이기혁</p>
                        <p>소 속 : VIC</p>
                        <p>직 위 : 매니저</p>
                        <p>메 일 : ihyuk@irkudos.co.kr</p>
                        <p>
                          <br />
                        </p>
                        <p>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
                        <p>
                          <br />
                        </p>
                        <p>개인정보침해신고센터 ( http://privacy.kisa.or.kr&nbsp; / 국번없이 118 )</p>
                        <p>대검찰청 사이버수사과 ( http://www.spo.go.kr / 국번없이 130 )</p>
                        <p>경찰청 사이버안전국 ( http://cyberbureau.police.go.kr / 국번없이 182 )</p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `10. 개인정보처리방침의 변경`,
              'desc': `<p>현 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지 '공지사항'을 통해 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일전에 고지합니다</p>
                        <p>휴대폰번호는 나이스평가정보에서 인증 받은 휴대폰 번호를 사용 하고 있습니다</p>
                        <p>
                          <br />
                        </p>
                        <p>- 공고 일자 : 2020년 00월 00일</p>
                        <p>- 시행 일자 : 2020년 00월 00일</p>
                        <p><br /></p>`
            }
          ]
        },
        {
          'title': '개인정보 제3자 제공 동의에 관한 사항',
          'subtitle': `<p style="font-size:12px;">LG디스플레이 IR전용 모바일 App(이하 “서비스”라 한다)과 관련하여, 본인은 아래의 내용을 숙지하였으며, 이에 따라 서비스가 수집한 본인의 개인정보를 아래와 같이 제3자에게 제공하는 것에 대해 동의합니다.</p>
                        <p>
                          <br />
                        </p>`,
          'zo': [
            {
              'subtitle': `1. 개인정보를 제공받는 자`,
              'desc': `<p>(주)IR큐더스</p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `2. 제공하는 항목`,
              'desc': `<p>성명, 이메일 주소, 전화번호, 생년월일, 성별, 미팅 신청인 및 방문자(동행인) 정보(회사명, 이름, 직책, 이메일, 연락처)</p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `3. 제공받는 자의 개인정보 이용목적`,
              'desc': `<p>IR활동 내역에 대한 메일링, 미팅 신청접수, 승인, 일정 안내 및 고객지원 등</p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `4. 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간`,
              'desc': `<p>개인정보는 본 서비스를 제공하는 기간 동안에 보유 및 이용되고, 이용자의 서비스 해지(회원탈퇴)시 해당인의 개인정보가 열람 또는 이용될 수 없도록 파기 처리함. 단, 아래의 경우는 예외로 함.</p>
                        <p>법령에서 따로 정하는 경우에는 해당 기간까지 보유</p>
                        <p>
                          <br />
                        </p>`
            },
            {
              'subtitle': `5. 고객은 개인정보의 제3자 제공에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 받는 별도의 불이익은 없습니다. 단, 서비스 이용이 불가능하거나, 서비스 이용 목적에 따른 서비스 제공에 제한이 따르게 됩니다.`,
              'desc': `<p>
                        <br />
                      </p>`
            },
            {
              'subtitle': `6. 상기에 기재되지 않은 개인정보 취급과 관련된 일반 사항은 서비스의 개인정보 취급방침에 따릅니다. 본인은 본 개인정보 제3자 제공에 대한 동의 내용을 자세히 숙지 및 이해하고, 이에 동의합니다.`,
              'desc': `<p>
                        <br />
                      </p>`
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getMainColor'])
  },
  watch: {
    allAgree () {
      const _self = this
      if (_self.allAgree) {
        _self.mcolor = '#' + _self.getMainColor
      } else {
        _self.mcolor = '#D1D1D6'
      }
    },
    serviceAgree () {
      const _self = this
      if (_self.giveAgree && _self.infoAgree && _self.serviceAgree) {
        _self.allAgree = true
      } else {
        _self.allAgree = false
      }
    },
    infoAgree () {
      const _self = this
      if (_self.giveAgree && _self.infoAgree && _self.serviceAgree) {
        _self.allAgree = true
      } else {
        _self.allAgree = false
      }
    },
    giveAgree () {
      const _self = this
      if (_self.giveAgree && _self.infoAgree && _self.serviceAgree) {
        _self.allAgree = true
      } else {
        _self.allAgree = false
      }
    },
    '$route.params' () {
      this.checkData()
    }
  },
  mounted () {
    this.checkData()
  },
  methods: {
    checkData () {
      if (this.$route.params.index) {
        let data = {
          di: this.$route.params.index
        }
        this.$store.dispatch('SESSION_TEMP_TO_DI', data)
          .then(res => {
            this.$store.commit('setUserDI', res.USER_DI)
            localStorage.setItem('DI', res.USER_DI)
          })
      } else {
        alert('잘못된 접근입니다.')
        this.$router.push('/')
      }
    },
    popClose () {
      const _self = this
      _self.IsPop = false
    },
    popOpen (idx) {
      const _self = this
      _self.IsPop = true
      _self.selNum = idx
    },
    allAgreeClick () {
      const _self = this
      if (!_self.allAgree) {
        _self.giveAgree = _self.infoAgree = _self.serviceAgree = true
      } else {
        _self.giveAgree = _self.infoAgree = _self.serviceAgree = false
      }
    },
    nextStep () {
      const _self = this
      if (_self.allAgree) {
        _self.$router.push('/additionalInfor')
      } else {
        alert('전체동의를 해주세요')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  word-break: keep-all;
}
a {
  text-decoration: none;
}
button {
  border: 0;
}
 .wrap {
   height:100%;
   padding-bottom:100px;
   .content {
     padding:0 34px;
   }
 }
 .header {
   position: relative;;
   padding-top:14px;
   margin-bottom:56px;
   text-align: center;
   .btn-link {
     display:inline-block;
     position:absolute;
     left:34px;
     top:22px;
     width:10px;
     height:10px;
     transform: rotate(45deg);
     border:2px solid #000;
     border-top:none;
     border-right:none;
     -webkit-tap-highlight-color:transparent;
   }
   strong {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
     }
   }
  .btn-bottom {
    display:block;
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    padding:13px 0 53px 0;
    background-color:#D1D1D6;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    &.active {
      background-color:#E91E63;
    }
  }
  .all {
    padding-bottom:16px;
    margin-bottom:20px;
    border-bottom:1px solid rgba(#313439 , .2);
    span{
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: #1B1D20;
    }
  }
  .check-box {
    position:relative;
    padding-right:46px;
    .btn-view {
      position: absolute;
      right:0;
      top:50%;
      font-size: 13px;
      line-height: 24px;
      text-align: right;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: #8E8E93;
      transform: translateY(-50%);
      background:none;
    }
    input {
      position:absolute;
      left:0;
      top:0;
      width:calc(100% - 47px);
      height:100%;
      opacity: 0;
      &:checked {
        & + span {
          background:url(../../assets/btn/btn_check_on.png) no-repeat left center;
        }
      }
    }
    span {
      padding-left:24px;
      background:url(../../assets/btn/btn_check.png) no-repeat left center;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: #545454;
    }
    & +.check-box {
      margin-top:33px;
    }
  }
  .pop2 {
    height: 100vh;
    width: 100vw;
    background-color:rgba($color: #191919, $alpha: 0);
    top: 0px;
    left: 0px;
    display: flex;
    position: fixed;
    z-index: -1;
    transition: all .5s;

    &.active {
      background-color:rgba($color: #191919, $alpha: .7);
    }
  }
  .pop {
    // display:none;
    display: flex;
    position:fixed;
    left:0;
    // top:0;
    top: 100vh;
    transition: all .3s;
    width:100%;
    height:100%;
    padding-top:10vh;
    // background-color:rgba($color: #191919, $alpha: .7);
    .pop-cont {
      height:100%;
      padding:0 16px 30px 16px;
      background: #FFFFFF;
      box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.25);
      border-radius: 6px 6px 0px 0px;
    }
    .pop-header {
      position:relative;
      padding:9px 0;
      margin-bottom:24px;
      text-align: center;
      border-bottom:1px solid rgba($color: #313439, $alpha: .2);
      strong {
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -0.5px;
        color: #1B1D20;
      }
      .pop-close {
        position:absolute;
        right:0;
        top:50%;
        width:24px;
        height:24px;
        transform: translateY(-50%);
        background:url(../../assets/btn/btn_close.svg) no-repeat center;
      }
    }
    .pop-inner {
      height: 100%;
      overflow: auto;
      padding-bottom: 50px;
      .title {
        font-weight: bold;
        margin-bottom:22px;
        font-size: 24px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -0.5px;
        color: #1B1D20;
      }
      .tit {
        margin-bottom:24px;
        text-align: center;
        font-size: 21px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -0.5px;
        color: #1B1D20;
      }
    }
    .desc {
      .num {
        display: inline-block;
        margin-bottom:4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 26px;
        letter-spacing: -0.5px;
        color: #1B1D20;
      }
      p {
        font-size: 12px;
        line-height: 18px;
        letter-spacing: -0.5px;
        color: #545454;
        & + p {
          margin-top:10px;
        }
        & + .num {
          margin-top:18px;
        }
      }
    }
    &.active {
      // display:block;
      top: 0;
    }
  }
 </style>
