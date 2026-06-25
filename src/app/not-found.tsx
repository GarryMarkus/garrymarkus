import Link from "next/link";
import { WindowChrome } from "@/components/WindowChrome";
import { AsciiArt } from "@/components/AsciiArt";
import { PageTransition } from "@/components/PageTransition";

const SAD_ROBOT = `
    .---.
  .'     '.
 /         \\
|  O     O  |
|    ___    |
 \\         /
  '._____.'
`;

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <WindowChrome title="user@portfolio: ~/404" promptPath="~/404">
          <div className="flex flex-col items-center text-center gap-6 py-8">
            <div className="text-[var(--accent-red)]">
              <AsciiArt art={SAD_ROBOT.trim()} />
            </div>

            <div className="font-mono text-[13px] flex flex-col gap-4 w-full">
              <div className="text-[var(--text-primary)]">bash: page: command not found</div>

              <div className="text-left mt-4 border-t border-[var(--bg-border)] pt-4">
                <Link
                  href="/"
                  className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline flex items-center gap-2 transition-colors duration-150"
                >
                  <span className="text-[var(--accent-purple)]">❯</span> cd ~
                </Link>
              </div>
            </div>
          </div>
        </WindowChrome>
      </div>
    </PageTransition>
  );
}
