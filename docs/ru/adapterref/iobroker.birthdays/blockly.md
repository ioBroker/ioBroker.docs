---
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"},"en/adapterref/iobroker.birthdays/blockly.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/blockly.md"},"en/adapterref/iobroker.birthdays/javascript.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/javascript.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.birthdays/blockly.md
title: ioBroker.дни рождения
hash: pQ6N7asxEQlLMkySRmfIbo7mvBncHPuDr2AnvQqmpPU=
---
![Логотип](../../../en/adapterref/iobroker.birthdays/../../admin/birthdays.png)

# IoBroker.дни рождения
## Пример (блочный)
![Блочный пример](../../../en/adapterref/iobroker.birthdays/./img/blockly-example.png)

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="p+Z^g1!hvR3!J9i,X(AI">text</variable>
  </variables>
  <block type="procedures_defnoreturn" id="gJY_AOXgo;b#ej2CXe3/" x="87" y="-212">
    <mutation>
      <arg name="text" varid="p+Z^g1!hvR3!J9i,X(AI"></arg>
    </mutation>
    <field name="NAME">sendText</field>
    <comment pinned="false" h="80" w="160">Beschreibe diese Funktion …</comment>
    <statement name="STACK">
      <block type="comment" id="/|AnoBF{dDY`~SsIfzH|">
        <field name="COMMENT">Own logic (pushover, telegram, ...)</field>
      </block>
    </statement>
  </block>
  <block type="schedule" id="6#((PC;76=!e/P3^ZsKI" x="88" y="163">
    <field name="SCHEDULE">0 7 * * *</field>
    <statement name="STATEMENT">
      <block type="controls_if" id="oZ%5t{r{bO3c{Xhl-|_a">
        <mutation elseif="1"></mutation>
        <value name="IF0">
          <block type="logic_compare" id=",Ui1[S(n}f`O*5_zS=:K">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="get_value" id="L/Vh`N_zLwYK$+90B)l.">
                <field name="ATTR">val</field>
                <field name="OID">birthdays.0.next.daysLeft</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="W87L*`2V7yMC5j};TO0,">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="procedures_callnoreturn" id="|%0O9GCBWm-9UV_Z~/%^">
            <mutation name="sendText">
              <arg name="text"></arg>
            </mutation>
            <value name="ARG0">
              <block type="text_join" id="rQa(!TVIvOgf/Vnn,nWG">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="text" id="h770a|!zX%7)X[Vk.2,[">
                    <field name="TEXT">Birthdays today: </field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="get_value" id="U2%GgLhMX(ra$S;y1/_K">
                    <field name="ATTR">val</field>
                    <field name="OID">birthdays.0.next.text</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="controls_if" id="$QQRR`a-vzSUU}88$?~`">
                <value name="IF0">
                  <block type="logic_compare" id="eg:?F}+ID`%G1LHM5PAZ">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="get_value" id="Ato::k3GO0QfM_Fs.6s;">
                        <field name="ATTR">val</field>
                        <field name="OID">birthdays.0.nextAfter.daysLeft</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number" id="n(N#~`eD{7Q,X!c=+/(V">
                        <field name="NUM">1</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="procedures_callnoreturn" id="T6*=i:ILlcQ^z%0.w~yK">
                    <mutation name="sendText">
                      <arg name="text"></arg>
                    </mutation>
                    <value name="ARG0">
                      <block type="text_join" id="*ne-l72dQ??5^6Dj2gV$">
                        <mutation items="2"></mutation>
                        <value name="ADD0">
                          <block type="text" id="ba}815_R_35-Y~GG*}/R">
                            <field name="TEXT">Birthdays tomorrow: </field>
                          </block>
                        </value>
                        <value name="ADD1">
                          <block type="get_value" id="u?8B|PylEzphdFq{f]QK">
                            <field name="ATTR">val</field>
                            <field name="OID">birthdays.0.nextAfter.text</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <value name="IF1">
          <block type="logic_compare" id="4E5@w,gT+=q(NaaGdT?U">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="get_value" id="~~U^$SjlNI3ns6I5Yz~O">
                <field name="ATTR">val</field>
                <field name="OID">birthdays.0.next.daysLeft</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="T{[v+psC[IzHkn.LkZP4">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO1">
          <block type="procedures_callnoreturn" id="I5L?1ZB,[|2x[Nm$8s4Z">
            <mutation name="sendText">
              <arg name="text"></arg>
            </mutation>
            <value name="ARG0">
              <block type="text_join" id="!EFb@yB_*Hm!QU{gcA]I">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="text" id="{ofc`NkX8NjN`:`DEIH*">
                    <field name="TEXT">Birthdays tomorrow: </field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="get_value" id=",%aRO_hL*tODl=By@eru">
                    <field name="ATTR">val</field>
                    <field name="OID">birthdays.0.next.text</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </statement>
  </block>
</xml>
```