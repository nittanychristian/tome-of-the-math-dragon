{
  perSystem = {
    pkgs,
    lib,
    ...
  }: let
    elmApp = pkgs.stdenv.mkDerivation {
      pname = "tome-of-the-math-dragon";
      version = "0.1.0";

      src = lib.fileset.toSource {
        root = ./..;
        fileset = lib.fileset.unions [
          ../elm.json
          ../elm-packages.nix
          ../registry.dat
          ../src
        ];
      };

      nativeBuildInputs = with pkgs; [
        elmPackages.elm
      ];

      # After updating elm.json, regenerate both files:
      #   elm2nix convert > elm-packages.nix
      #   elm2nix snapshot
      configurePhase = pkgs.elmPackages.fetchElmDeps {
        elmPackages = import ../elm-packages.nix;
        elmVersion = "0.19.1";
        registryDat = ../registry.dat;
      };

      buildPhase = ''
        export HOME=$TMPDIR
        rm -rf elm-stuff
        mkdir -p $out
        elm make src/Main.elm --optimize --output=$out/elm.js
        cp src/index.html $out/index.html
        cp ${pkgs.google-fonts}/share/fonts/truetype/PressStart2P-Regular.ttf $out/PressStart2P-Regular.ttf
      '';

      installPhase = "true";

      meta = {
        maintainers = with lib.maintainers; [
          disassembler
        ];
        license = with lib.licenses; [
          asl20
        ];
      };
    };
  in {
    checks = {
      inherit elmApp;
    };

    packages = {
      default = elmApp;
      yourapp = elmApp;
    };
  };
}
