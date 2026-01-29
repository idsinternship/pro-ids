import UserMenu from "../components/user/UserMenu";

type Props = {
  title: string;
};

export default function Topbar({ title }: Props) {
  return (
    <header className="topbar">
      <h2>{title}</h2>

      <div className="user">
        <div>
          <div style={{ fontWeight: 600 }}>bjkhjvghcfx</div>
          <div className="role">STUDENT</div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
