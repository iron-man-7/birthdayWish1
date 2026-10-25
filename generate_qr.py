from pathlib import Path
import qrcode


def main() -> None:
    print("Birthday page QR maker")
    print("Paste the public URL of your deployed birthday page.")
    url = input("Website URL: ").strip()
    if not url.startswith(("https://", "http://")):
        print("Please enter a full URL starting with https:// or http://")
        return
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    image = qr.make_image(fill_color="#11151b", back_color="#ffffff")
    output = Path(__file__).resolve().parent / "birthday-qr.png"
    image.save(output)
    print(f"Saved QR code to: {output}")
    print("Scan it with your phone camera to test it before sharing.")


if __name__ == "__main__":
    main()
