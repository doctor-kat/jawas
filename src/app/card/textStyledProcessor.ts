const SENTINEL_WITH_REMINDER = /<p><strong>Sentinel<\/strong>(.*)<\/p>/;
const KEYWORD = /<strong>(Sentinel|Shielded|Raid \d+)<\/strong>/;

export function replaceKeywords(textStyled: string): string {
    return textStyled
        .replace(
            SENTINEL_WITH_REMINDER,
            `<p class="sentinel"><strong class="keyword">Sentinel</strong>$1</p>`,
        )
        .replace(KEYWORD, `<strong class="keyword">$1</strong>`);
}
