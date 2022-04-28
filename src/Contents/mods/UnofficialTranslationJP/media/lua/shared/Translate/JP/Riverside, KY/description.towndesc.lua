-- <L> タグは折り返していい場所の指定で、このMODをビルドする際にPZ用のタグに変換されます。
-- <L> -> `{U+2005(FOUR-PER-EM SPACE)}{SPACE}<LEFT>{SPACE}`

-- 原文
-- cite: https://github.com/TheIndieStone/ProjectZomboidTranslations/blob/master/EN/Riverside%2C%20KY/description.txt
--[[
A colorful town tightly hugging the banks of the mighty Ohio: exploring Riverside is a rich and diverse experience!
To the west you'll find the older parts of town, while out east is where our wealthier residents work, rest and play.

In fact, if you're considering a stay with us, why not check out the nearby Knox Heights Country Club? The ultimate in comfort and relaxation: members have access to an 18 hole golf course, tennis courts, swimming pool and spa. Come join today!
]]

--[[
大河オハイオのほとりにあるカラフルな町、リバーサイド。ここでの探索では、豊かで多様な体験が得られます！
西側には古い町並みがあります。東側へ足を運べば、富裕層が働き、休み、遊ぶ場所を見られるでしょう。

実際に滞在をお考えの場合、近くのKnox Heightsカントリークラブをチェックしてみてはいかがでしょうか？
究極の快適さとくつろぎ――会員は18ホールのゴルフコース、テニスコート、プール、スパをご利用いただけます。
今すぐご入会ください！
]]

local Description = "<SIZE:large>リバーサイド" ..
    "<LINE><SIZE:medium>" ..
    "<LINE>大河<L>オハイオの<L>ほとりに<L>ある<L>カラフルな<L>町、<L>リバーサイド。<L>ここでの<L>探索では、<L>豊かで<L>多様な<L>体験が<L>得られ<L>ます！" ..
    "<LINE>西側には<L>古い<L>町並みが<L>あり<L>ます。<L>東側へ<L>足を<L>運べば、<L>富裕層が<L>働き、<L>休み、<L>遊ぶ<L>場所を<L>見られる<L>でしょう。" ..
    "<LINE>" ..
    "<LINE>実際に<L>滞在を<L>お考えの<L>場合、<L>近くの<L>Knox Heights<L>カントリー<L>クラブを<L>チェック<L>しては<L>いかが<L>でしょうか？" ..
    "<LINE>究極の<L>快適さと<L>くつろぎ<L>――会員は<L>18ホールの<L>ゴルフ<L>コース、<L>テニス<L>コート、<L>プール、<L>スパを<L>ご利用<L>いただけ<L>ます。" ..
    "<LINE>今すぐ<L>ご入会<L>ください！"
