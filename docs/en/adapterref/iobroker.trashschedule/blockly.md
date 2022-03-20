---
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

## Blockly example

![Blockly example](./img/exampleBlockly.png)

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="comment" id="@ObjS.SGnDWy?:*J=bee" x="37" y="188">
    <field name="COMMENT">At 6 PM at the day before (days left = 1)</field>
    <next>
      <block type="schedule" id=";J}3hpr7:d~*N?CrR==A">
        <field name="SCHEDULE">0 18 * * *</field>
        <statement name="STATEMENT">
          <block type="controls_if" id="EjaN~}B1gMA9ySf2%9kr">
            <value name="IF0">
              <block type="logic_operation" id="+hQc|po$a[W}HKd]slrE" inline="false">
                <field name="OP">AND</field>
                <value name="A">
                  <block type="get_value" id="Q;BN3$0J3q5$0sumfBYC">
                    <field name="ATTR">val</field>
                    <field name="OID">trashschedule.0.next.dateFound</field>
                  </block>
                </value>
                <value name="B">
                  <block type="logic_compare" id=")Z1Ml4oq9UCnquPo!giX">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="get_value" id="k@gpt[%7O[i`*b;SWlu4">
                        <field name="ATTR">val</field>
                        <field name="OID">trashschedule.0.next.daysLeft</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number" id="([hVlm^PW0,gm`C/xp?a">
                        <field name="NUM">1</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="pushover" id="vqjP6Z6|7M.^)lx4]GiG">
                <field name="INSTANCE"></field>
                <field name="SOUND">gamelan</field>
                <field name="PRIORITY">0</field>
                <field name="LOG"></field>
                <value name="MESSAGE">
                  <shadow type="text" id="yt8+Z!a;[|CJy`,K(B.3">
                    <field name="TEXT">text</field>
                  </shadow>
                  <block type="text_join" id="pm:dwF91X!Oj82P^4Oz8">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="text" id="%|}mW_iCoyweL$jy9wHq">
                        <field name="TEXT">Trash will be picked up tomorrow: </field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="get_value" id="~TDqVlE(:gEW7snO2_]s">
                        <field name="ATTR">val</field>
                        <field name="OID">trashschedule.0.next.typesText</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="TITLE">
                  <block type="text" id="t*+0*zY(|S3fI3WBX[2g">
                    <field name="TEXT">Trash</field>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </statement>
        <next>
          <block type="comment" id="~rf)Dy*vQ]9g?yVIWVsP">
            <field name="COMMENT">At 7 AM (days left = 0)</field>
            <next>
              <block type="schedule" id="O%4=ke4-(?vnjhtIDnt3">
                <field name="SCHEDULE">0 7 * * *</field>
                <statement name="STATEMENT">
                  <block type="controls_if" id="kyfB;W(WcA(/-ZWG2j6(">
                    <value name="IF0">
                      <block type="logic_operation" id=".wZBS3T):whb7WB!a-c_" inline="false">
                        <field name="OP">AND</field>
                        <value name="A">
                          <block type="get_value" id=",jhL[do$G_Q6TNBH,D]o">
                            <field name="ATTR">val</field>
                            <field name="OID">trashschedule.0.next.dateFound</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="logic_compare" id="Rlwt:Jv/rTfO.E:ZmYak">
                            <field name="OP">EQ</field>
                            <value name="A">
                              <block type="get_value" id="WdL)rds~)z*-)1k),cX(">
                                <field name="ATTR">val</field>
                                <field name="OID">trashschedule.0.next.daysLeft</field>
                              </block>
                            </value>
                            <value name="B">
                              <block type="math_number" id="w%5y6PluO}wjq]lDY+Gd">
                                <field name="NUM">0</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <statement name="DO0">
                      <block type="pushover" id="L,TLF/L9|B6bF4)|gj?F">
                        <field name="INSTANCE"></field>
                        <field name="SOUND">gamelan</field>
                        <field name="PRIORITY">0</field>
                        <field name="LOG"></field>
                        <value name="MESSAGE">
                          <shadow type="text">
                            <field name="TEXT">text</field>
                          </shadow>
                          <block type="text_join" id="Cw#u;:L537u`7Dz2:Kll">
                            <mutation items="2"></mutation>
                            <value name="ADD0">
                              <block type="text" id=".zD)ZQXz7Esr0%?Z1Y(|">
                                <field name="TEXT">Trash will be picked up today: </field>
                              </block>
                            </value>
                            <value name="ADD1">
                              <block type="get_value" id="9m]6=cBQH_B(%ZOH*j-4">
                                <field name="ATTR">val</field>
                                <field name="OID">trashschedule.0.next.typesText</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="TITLE">
                          <block type="text" id="ki`]5O+.IzI%2Gfw5VT-">
                            <field name="TEXT">Trash</field>
                          </block>
                        </value>
                      </block>
                    </statement>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```